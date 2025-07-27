import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface User {
  nickName: string;
}

interface UserState {
  accessToken: string | null;
  user: User | null;
  setAccessToken: (token: string) => void;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, _get) => ({
      accessToken: null,
      user: null,
      setAccessToken: (token: string) => {
        set({ accessToken: token });
      },
      setUser: (user: User | null) => {
        set({ user });
      },
      clearUser: () => {
        set({ accessToken: null, user: null });
      },
    }),
    {
      name: 'user-storage', // localStorage에 저장될 때 사용될 키
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({ accessToken: state.accessToken }), // accessToken만 저장
    }
  )
);
