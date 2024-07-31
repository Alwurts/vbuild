import type { ComposerStore } from "@/types/jsx-store";
import { create } from "zustand";

export const useStyleManagerStore = create<ComposerStore>((set) => ({
  nodes: {},
  headNodeKey: "",
}));
