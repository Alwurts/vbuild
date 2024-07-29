import type { ButtonStore } from "@/types/store";
import type { ButtonStyle, StyleGroup, StyleProperty } from "@/types/style";
import { create } from "zustand";

const DEFAULT_BUTTON_STYLE = {
	background: {
		bgColor: "bg-primary",
	},
	text: {
		textColor: "text-primary-foreground",
		fontSize: "text-sm",
		fontWeight: "font-medium",
	},
	border: {
		borderColor: "border-transparent",
		borderWidth: "border-none",
		borderStyle: "border-none",
		rounded: "rounded-md",
	},
	size: {
		paddingX: "px-4",
		height: "h-10",
	},
	effects: {
		shadow: "shadow-none",
		opacity: "opacity-100",
	},
};

export const useStyleManagerStore = create<ButtonStore>((set) => ({
	styles: {
		default: {
			background: {
				...DEFAULT_BUTTON_STYLE.background,
			},
			text: {
				...DEFAULT_BUTTON_STYLE.text,
			},
		},
		destructive: {
			background: { bgColor: "bg-destructive" },
			text: {
				...DEFAULT_BUTTON_STYLE.text,
				textColor: "text-destructive-foreground",
			},
		},
		outline: {
			background: { bgColor: "bg-background" },
			text: {
				...DEFAULT_BUTTON_STYLE.text,
				textColor: "text-foreground",
			},
			border: {
				borderColor: "border-input",
				borderWidth: "border",
				borderStyle: "border-solid",
				rounded: "rounded-md",
			},
		},
		secondary: {
			background: { bgColor: "bg-secondary" },
			text: {
				...DEFAULT_BUTTON_STYLE.text,
				textColor: "text-secondary-foreground",
			},
		},
		ghost: {
			background: { bgColor: "bg-transparent" },
			text: {
				...DEFAULT_BUTTON_STYLE.text,
				textColor: "text-foreground",
			},
		},
		link: {
			background: { bgColor: "bg-transparent" },
			text: {
				...DEFAULT_BUTTON_STYLE.text,
				textColor: "text-primary",
			},
		},
	},
	currentStyle: "default",
	text: "Edit me",
	setStyle: (styleName, group, property, value) => {
		console.log(`Setting style: ${styleName}, ${group}, ${property}, ${value}`);
		set((state) => {
			const updatedStyle = updateNestedProperty(
				state.styles[styleName],
				group,
				property,
				value,
			);
			console.log("Updated style:", updatedStyle);
			return {
				styles: {
					...state.styles,
					[styleName]: updatedStyle,
				},
			};
		});
	},
	setCurrentStyle: (styleName) => set({ currentStyle: styleName }),
}));

function updateNestedProperty(
  style: ButtonStyle,
  group: StyleGroup,
  property: StyleProperty,
  value: string,
): ButtonStyle {
  console.log('Updating nested property:');
  console.log('Current style:', style);
  console.log(`Group: ${group}, Property: ${property}, New value: ${value}`);

  const updatedStyle = {
    ...style,
    [group]: {
      ...style[group],
      [property]: value,
    },
  };

  console.log('Updated style:', updatedStyle);
  return updatedStyle;
}
