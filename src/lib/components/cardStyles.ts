import type { CardComponentStyle } from "@/types/card";

export const DEFAULT_CARD_STYLE: CardComponentStyle = {
  variant: {
    default: {
      background: {
        isApplied: true,
        properties: {
          bgColor: "bg-card",
        },
      },
      border: {
        isApplied: true,
        properties: {
          borderColor: "border",
          borderWidth: "border",
          rounded: "rounded-lg",
        },
      },
      text: {
        isApplied: true,
        properties: {
          textColor: "text-card-foreground",
        },
      },
      effects: {
        isApplied: true,
        properties: {
          shadow: "shadow-sm",
        },
      },
      padding: {
        isApplied: true,
        properties: {
          paddingX: "px-6",
          paddingY: "py-6",
        },
      },
    },
  },
};