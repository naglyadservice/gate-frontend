import { create } from "zustand";
import apiClient from "./client";
import toast from "react-hot-toast";


interface IAuth {
  user_id: string;
  email: string;
  name: string;
}

interface IAuthFetching {
  isAuthLoading: boolean;
  isAuthError: boolean;

  authGoogleRedirectUrl: string;

  getAuthMe: () => void;
  getGoogleLoginUrl: () => void;
  logout: () => void;
}

const useAuth = create<IAuth & IAuthFetching>((set) => ({
  user_id: "",
  email: "",
  name: "",

  isAuthLoading: true,
  isAuthError: false,

  authGoogleRedirectUrl: "",

  getAuthMe: async () => {
    try {
      set({ isAuthLoading: true, isAuthError: false });
      const { data } = await apiClient.get<IAuth>(`/me`);

      set(data);
      console.log(data);
    } catch (error) {
      set({ isAuthError: true });
    } finally {
      set({ isAuthLoading: false });
    }
  },

  getGoogleLoginUrl: async () => {
    try {
      const { data } = await apiClient.get(`/login/google`);

      set({ authGoogleRedirectUrl: data.auth_url });
    } catch (error) {
      toast.error("Error...");
      console.warn({ error });
    }
  },

  logout: async () => {
    try {
      await apiClient.post("/auth/logout");

      set({
        user_id: "",
        email: "",
        name: ""
      });
    } catch (error) {
      toast.error("Error...");
      console.warn({ error });
    }
  }
}))

export { useAuth }