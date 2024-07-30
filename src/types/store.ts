import type { ButtonComponentStyle } from "./button";
import type { BadgeComponentStyle } from "./badge";
import type { ComponentType, StyleGroup, AllComponentStyles } from "./style";

export interface ComponentStore {
  styles: AllComponentStyles;
  currentComponent: ComponentType;
  currentVariant: {
    variant: string;
    size: string;
  };
  componentText: string;
  setComponentText: (value: string) => void;
  setCurrentComponent: (component: ComponentType) => void;
  setStyleProperty: (params: {
    component: ComponentType;
    styleType: "variant" | "size";
    styleName: string;
    group: StyleGroup;
    property: string;
    value: string;
  }) => void;
  toggleGroupIsApplied: (params: {
    component: ComponentType;
    styleType: "variant" | "size";
    styleName: string;
    group: StyleGroup;
  }) => void;
  setCurrentVariant: (params: {
    styleType: "variant" | "size";
    name: string;
  }) => void;
}