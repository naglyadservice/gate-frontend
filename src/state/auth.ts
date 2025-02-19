import { create } from "zustand";
import apiClient from "../utils/client";
import toast from "react-hot-toast";


interface IAuth {
  id: string;
  email: string;
  name: string;
  image_url: string;
  phone_number: string;
  auto_1: string;
  auto_2: string;
  role: "" | "USER" | "ADMIN" | "SUPERADMIN";
}

interface IAuthFetching {
  isAuthLoading: boolean;
  isAuthError: boolean;

  getAuthMe: () => Promise<void>;
  logout: () => void;
}



const useAuth = create<IAuth & IAuthFetching>((set) => ({
  id: "",
  name: "",
  email: "",
  image_url: "",
  phone_number: "",
  auto_1: "",
  auto_2: "",

  role: "",

  isAuthLoading: true,
  isAuthError: false,

  authGoogleRedirectUrl: "",

  getAuthMe: async () => {
    try {
      set({ isAuthLoading: true, isAuthError: false });
      const { data } = await apiClient.get<IAuth>(`/users/me`);

      set(data);
      console.log(data);
    } catch (error) {
      set({ isAuthError: true });
    } finally {
      set({ isAuthLoading: false });
    }
  },

  logout: async () => {
    try {
      await apiClient.post("/auth/logout");

      set({
        id: "",
        email: "",
        name: "",
        image_url: "",
      });
    } catch (error) {
      toast.error("Error...");
      console.warn({ error });
    }
  }
}))

export { useAuth }