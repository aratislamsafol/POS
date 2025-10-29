import {create} from "zustand";

interface SidebarState {
  open: boolean;
  setOpen: (open: boolean) => void;
  expandedItems: Record<string, boolean>;
  toggleExpand: (label: string) => void;
  role: string;
  setRole: (role: string) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  open: true,
  setOpen: (value: boolean | ((prev: boolean) => boolean)) =>
    set((state) => ({
      open: typeof value === "function" ? value(state.open) : value,
    })),
  expandedItems: {},
  toggleExpand: (label) =>
    set((state) => ({
      expandedItems: {
        ...state.expandedItems,
        [label]: !state.expandedItems[label],
      },
    })),
  role: "admin",
  setRole: (role) => set({ role }),
}));

