import toast from "react-hot-toast";
import { create } from "zustand";
import apiClient from "./client";

interface IGate {
  id: string;
  label: string;
}

interface IGates {
  gates: IGate[];

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

      const { data } = await apiClient.get<IGates['gates']>(`/me/accesspoints`);

      // const { data } = await axios.get<IGates['gates']>(`https://666458a8932baf9032aac87b.mockapi.io/gates`);

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