import { create } from "zustand";

type currentGate = {
  id: string;
  gateFor: string;
  address: string;
}

type currentLocation = {
  id: string;
  name: string;
  city: string;
  address: string;
  cameraUrl: string;
  code: string;
}

interface IAccountGate {
  currentGate: currentGate;
  setCurrentGate: (gate: currentGate) => void;

  currentLocation: Partial<currentLocation>;
  setCurrentLocation: (location: Partial<currentLocation>) => void;
}

export const useAccountSettings = create<IAccountGate>((set) => ({
  currentGate: {
    id: "",
    gateFor: "",
    address: ""
  },

  currentLocation: {
    name: "",
    city: "",
    address: "",
    cameraUrl: "",
    code: ""
  },

  setCurrentGate: (gate) => set({ currentGate: gate }),
  setCurrentLocation: (location) => set({ currentLocation: location })
}));