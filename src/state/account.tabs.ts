import { create } from "zustand";

export type tabsType = ""
  | "requests"
  | "history"
  | "users"
  | "settings"
  | "settings/gate"
  | "settings/location"
  | "settings/location/create"
  | "settings/location/accesspoint";

interface IAccount {
  tab: tabsType;
  setTab: (inc: tabsType) => void;
}

export const useAccountTab = create<IAccount>((set) => ({
  tab: "",

  setTab: (inc) => set({ tab: inc })
}))