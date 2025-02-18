import { create } from "zustand";
import { ILocation, useLocation } from "./locations";

type currentGate = {
  id: string;
  gateFor: string;
  address: string;
}

interface IAccountGate {
  currentGate: currentGate;
  setCurrentGate: (gate: currentGate) => void;

  currentLocation: Partial<ILocation>;
  setCurrentLocation: (id: string) => void;
}

export const useAccountSettings = create<IAccountGate>((set) => ({
  currentGate: {
    id: "",
    gateFor: "",
    address: ""
  },

  currentLocation: {
    id: "",
    name: "",
    address: "",
    access_code: "",
    accesspoint_ids: []
  },

  setCurrentGate: (gate) => set({ currentGate: gate }),
  setCurrentLocation: (id) => set({ currentLocation: useLocation.getState().locations.find(el => el.id === id) }),
}));

