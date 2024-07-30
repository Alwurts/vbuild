import type { Style, StyleGroup } from "./style";

export type BadgeVariantName = "default" | "secondary" | "destructive" | "outline";

export type BadgeVariantStyle = {
  [K in Exclude<StyleGroup, "size">]: Style<K>;
};

export type BadgeComponentStyle = {
  variant: {
    [T in BadgeVariantName]: BadgeVariantStyle;
  };
};