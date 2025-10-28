import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  token: string | null;
  isLoggedIn: boolean;
  setToken: (token: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isLoggedIn: false,
      setToken: (token: string) =>
        set({
          token,
          isLoggedIn: true,
        }),
      logout: () =>
        set({
          token: null,
          isLoggedIn: false,
        }),
    }),
    {
      name: "auth-storage", 
      storage: createJSONStorage(() => localStorage), 
    }
  )
);

export default useAuthStore;
