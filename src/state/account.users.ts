import { create } from "zustand";
import apiClient from "../utils/client";

interface IUser {
  id: string;
  email: string;
  name: string;
  image_url: string;
  phone_number: string;
  auto_1: string;
  auto_2: string;
}

interface IAccountUsers {
  users: IUser[];

  getUsers: (locationId: string) => Promise<void>;
}

const useAccountUsers = create<IAccountUsers>((set) => ({
  users: [],

  getUsers: async (id) => {
    try {
      const { data } = await apiClient.get<IUser[]>(`/me`);

      set({ users: data });
      console.log(data);
    } catch (error) {
      console.warn(error)
    }
  },
}))