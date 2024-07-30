import type { Style, StyleGroup } from "./style";

export type BadgeVariantName = "default" | "secondary" | "destructive" | "outline";

export type BadgeVariantStyle = {
  [K in Exclude<StyleGroup, "padding">]: K extends "size" 
    ? Style<K> & {
        properties: {
          paddingX: string;
          paddingY: string;
        }
      }
    : Style<K>;
};

export type BadgeComponentStyle = {
  variant: {
    [T in BadgeVariantName]: BadgeVariantStyle;
  };
};