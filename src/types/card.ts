import type { ComponentStyle, Style, StyleGroup } from "./style";

export type CardStyleProperties = {
  background: Style<"background">;
  border: Style<"border">;
  text: Style<"text">;
  effects: Style<"effects">;
  padding: Style<"size">;
};

export type CardComponentStyle = ComponentStyle<
  "default",
  never,
  CardStyleProperties,
  never
>;