import { create } from "zustand";

interface IDrawer {
  isDrawer: boolean;
  toggleDrawer: () => void;
}

const useDrawer = create<IDrawer>((set) => ({
  isDrawer: false,
  toggleDrawer: () => set((state) => ({ isDrawer: !state.isDrawer }))
}))

export { useDrawer }