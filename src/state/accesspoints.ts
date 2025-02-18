import toast from "react-hot-toast";
import { create } from "zustand";
import apiClient from "../utils/client";


interface IGates {
  gates: IAccesspoint[];

  openGateById: (accesspoint_id: string) => Promise<void>;
}

interface IGatesFetching {
  isGatesLoading: boolean;
  isGatesError: boolean;

  getAllGates: () => Promise<void>;
}



const useGates = create<IGates & IGatesFetching>((set) => ({
  gates: [],

  isGatesLoading: true,
  isGatesError: false,

  getAllGates: async () => {
    try {
      set({ isGatesLoading: true, isGatesError: false });

      const { data } = await apiClient.get<IGates['gates']>(`/users/me/accesspoints`);

      set({ gates: data });
    } catch (error) {
      set({ isGatesError: true });
      toast.error("Error...");
    } finally {
      set({ isGatesLoading: false });
    }
  },

  openGateById: async (accesspoint_id) => {
    await apiClient.post(`/me/accesspoints/${accesspoint_id}/activate`)
  }
}))

export { useGates }