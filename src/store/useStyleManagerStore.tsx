import type { ComponentType, AllComponentStyles, StyleGroup } from "@/types/style";
import type { ComponentStore } from "@/types/store";
import { create } from "zustand";
import { DEFAULT_BUTTON_STYLE } from "@/lib/components/buttonStyles";
import { DEFAULT_BADGE_STYLE } from "@/lib/components/badgeStyles";

const DEFAULT_STYLES: AllComponentStyles = {
  button: DEFAULT_BUTTON_STYLE,
  badge: DEFAULT_BADGE_STYLE,
};

export const useStyleManagerStore = create<ComponentStore>((set) => ({
  styles: DEFAULT_STYLES,
  currentComponent: "button",
  currentVariant: {
    variant: "default",
    size: "default",
  },
  componentText: "Edit me",
  setComponentText: (value) => set({ componentText: value }),
  setCurrentComponent: (component) => set({ currentComponent: component }),
  setStyleProperty: ({
    component,
    styleType,
    styleName,
    group,
    property,
    value,
  }) =>
    set((state) => {
      const newStyles = { ...state.styles };
      const componentStyles = newStyles[component];
      const stylesType = componentStyles[styleType];
      // @ts-ignore (due to dynamic access)
      const stylesTypeVariant = stylesType[styleName];
      stylesTypeVariant[group].properties[property] = value;
      return { styles: newStyles };
    }),
  toggleGroupIsApplied: ({ component, styleType, styleName, group }) =>
    set((state) => {
      const newStyles = { ...state.styles };
      const componentStyles = newStyles[component];
      const stylesType = componentStyles[styleType];
      // @ts-ignore (due to dynamic access)
      const stylesTypeVariant = stylesType[styleName];
      stylesTypeVariant[group].isApplied = !stylesTypeVariant[group].isApplied;
      return { styles: newStyles };
    }),
  setCurrentVariant: ({ styleType, name }) =>
    set((state) => ({
      currentVariant: { ...state.currentVariant, [styleType]: name },
    })),
}));