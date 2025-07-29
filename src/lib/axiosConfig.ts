import { useUserStore } from '@/store/user';
import axios from 'axios';
import { refreshToken } from '@/api/auth';

export const requests = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

requests.interceptors.request.use(
  config => {
    const { accessToken } = useUserStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let failedQueue: {
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}[] = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

requests.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    const loginUrlPattern = /^\/api\/v1\/login\/(google|naver|kakao)$/;

    if (
      error.response?.status === 401 &&
      originalRequest.url !== '/api/v1/auth/reissue/token' &&
      !loginUrlPattern.test(originalRequest.url)
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return requests(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { headers } = await refreshToken();
        const newAccessToken = headers.authorization.split(' ')[1];
        useUserStore.getState().setAccessToken(newAccessToken);
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        processQueue(null, newAccessToken);
        return requests(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as Error, null);
        useUserStore.getState().clearUser();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
