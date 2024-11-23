import axios from "axios";
import { create } from "zustand";

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
      const { data } = await axios.get<IAuth>(`https://gate.iotapps.net/api/me`);

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
      const { data } = await axios.get(`https://gate.iotapps.net/api/login/google`);

      set({ authGoogleRedirectUrl: data.auth_url });
    } catch (error) {
      console.warn({ error })
    }
  }
}))

export { useAuth }