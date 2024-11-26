// import axios from 'axios';
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

  getAllGates: async (user_id) => {
    try {
      set({ isGatesLoading: true, isGatesError: false });

      const { data } = await apiClient.get<IGates['gates']>(`/users/${user_id}/accesspoints`);

      // const { data } = await axios.get<IGates['gates']>(`https://666458a8932baf9032aac87b.mockapi.io/gates`);

      set({ gates: data });
    } catch (error) {
      set({ isGatesError: true });
      toast.error("Error...");
    } finally {
      set({ isGatesLoading: false });
    }
  },

  openGateById: async (user_id, accesspoint_id) => {
    try {
      await apiClient.get(`/users/${user_id}/accesspoints/${accesspoint_id}/activate`)

      toast.success("Gate is opened");
    } catch (error) {
      toast.error("Error...");
    }
  }
}))

export { useGates }