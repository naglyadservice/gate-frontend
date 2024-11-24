import toast from "react-hot-toast";
import { create } from "zustand";
import apiClient from "./client";

interface IGate {
  id: string;
  label: string;
}

interface IGates {
  gates: IGate[];

  openGateById: (user_id: string, accesspoint_id: string) => void;
}

interface IGatesFetching {
  isGatesLoading: boolean;
  isGatesError: boolean;

  getAllGates: (user_id: string) => void;
}

const useGates = create<IGates & IGatesFetching>((set) => ({
  gates: [],

  isGatesLoading: true,
  isGatesError: false,

  getAllGates: async () => {
    try {
      set({ isGatesLoading: true, isGatesError: false });

      const { data } = await apiClient.get<IGates['gates']>(`/me/accesspoints`);

      set({ gates: data });
    } catch (error) {
      set({ isGatesError: true });
      toast.error("Error...");
    } finally {
      set({ isGatesLoading: false });
    }
  },

  openGateById: async (accesspoint_id) => {
    try {
      await apiClient.get(`/me/accesspoints/${accesspoint_id}/activate`)

      toast.success("Gate is opened");
    } catch (error) {
      toast.error("Error...");
    }
  }
}))

export { useGates }