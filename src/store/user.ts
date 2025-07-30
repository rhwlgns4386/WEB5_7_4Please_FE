import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UserState {
  accessToken: string | null;
  nickname: string | null;
  setAccessToken: (token: string) => void;
  setNickname: (nickname: string) => void;
  clearUser: () => void;
}

export const useUserStore = create(
  persist<UserState>(
    set => ({
      accessToken: null,
      nickname: null,
      setAccessToken: token => set({ accessToken: token }),
      setNickname: nickname => set({ nickname }),
      clearUser: () => set({ accessToken: null, nickname: null }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
