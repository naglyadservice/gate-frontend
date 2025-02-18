import { create } from "zustand";
import apiClient from "../utils/client";

interface IAccespoint {
  id: string;
  label: string;
  address: string;
}

export interface ILocation {
  id: string;
  owner_id: string;
  name: string;
  address: string;
  access_code: string;
  accesspoints: IAccespoint[];
  accesspoint_ids: string[]
}

interface IUseLocations {
  locations: ILocation[];
  getAllLocations: () => Promise<void>;

  selectedLocation: ILocation | null;
  selectLocation: (location: any) => void;
}

export const useLocation = create<IUseLocations>((set) => ({
  locations: [],

  getAllLocations: async () => {
    try {
      const { data } = await apiClient("/users/me/locations");
      set({ locations: data });
      set({ selectedLocation: data[0] });
    } catch (error) {
      console.warn(error);
    }
  },

  selectedLocation: null,

  selectLocation: (location) => {
    set({ selectedLocation: location });
  }
}))