import type {
	ButtonSizeName,
	ButtonSizeStyle,
	ButtonStyle,
	ButtonVariantName,
	ButtonVariantStyle,
} from "@/types/button";
import type { ComponentStore } from "@/types/store";
import { create } from "zustand";

const DEFAULT_BUTTON_STYLE: ButtonStyle = {
	variant: {
		default: {
			background: { isApplied: true, properties: { bgColor: "bg-primary" } },
			text: {
				isApplied: true,
				properties: {
					textColor: "text-primary-foreground",
					fontSize: "text-sm",
					fontWeight: "font-medium",
				},
			},
			border: {
				isApplied: false,
				properties: {
					borderColor: "border-transparent",
					borderWidth: "border-none",
					borderStyle: "border-none",
					rounded: "rounded-md",
				},
			},
			effects: {
				isApplied: false,
				properties: { shadow: "shadow-none", opacity: "opacity-100" },
			},
		},
		destructive: {
			background: {
				isApplied: true,
				properties: { bgColor: "bg-destructive" },
			},
			text: {
				isApplied: true,
				properties: {
					textColor: "text-destructive-foreground",
					fontSize: "text-sm",
					fontWeight: "font-medium",
				},
			},
			border: {
				isApplied: false,
				properties: {
					borderColor: "border-transparent",
					borderWidth: "border-none",
					borderStyle: "border-none",
					rounded: "rounded-md",
				},
			},
			effects: {
				isApplied: false,
				properties: { shadow: "shadow-none", opacity: "opacity-100" },
			},
		},
		outline: {
			background: { isApplied: true, properties: { bgColor: "bg-background" } },
			text: {
				isApplied: true,
				properties: {
					textColor: "text-foreground",
					fontSize: "text-sm",
					fontWeight: "font-medium",
				},
			},
			border: {
				isApplied: true,
				properties: {
					borderColor: "border-input",
					borderWidth: "border",
					borderStyle: "border-solid",
					rounded: "rounded-md",
				},
			},
			effects: {
				isApplied: false,
				properties: { shadow: "shadow-none", opacity: "opacity-100" },
			},
		},
		secondary: {
			background: { isApplied: true, properties: { bgColor: "bg-secondary" } },
			text: {
				isApplied: true,
				properties: {
					textColor: "text-secondary-foreground",
					fontSize: "text-sm",
					fontWeight: "font-medium",
				},
			},
			border: {
				isApplied: false,
				properties: {
					borderColor: "border-transparent",
					borderWidth: "border-none",
					borderStyle: "border-none",
					rounded: "rounded-md",
				},
			},
			effects: {
				isApplied: false,
				properties: { shadow: "shadow-none", opacity: "opacity-100" },
			},
		},
		ghost: {
			background: {
				isApplied: true,
				properties: { bgColor: "bg-transparent" },
			},
			text: {
				isApplied: true,
				properties: {
					textColor: "text-foreground",
					fontSize: "text-sm",
					fontWeight: "font-medium",
				},
			},
			border: {
				isApplied: false,
				properties: {
					borderColor: "border-transparent",
					borderWidth: "border-none",
					borderStyle: "border-none",
					rounded: "rounded-md",
				},
			},
			effects: {
				isApplied: false,
				properties: { shadow: "shadow-none", opacity: "opacity-100" },
			},
		},
		link: {
			background: {
				isApplied: true,
				properties: { bgColor: "bg-transparent" },
			},
			text: {
				isApplied: true,
				properties: {
					textColor: "text-primary",
					fontSize: "text-sm",
					fontWeight: "font-medium",
				},
			},
			border: {
				isApplied: false,
				properties: {
					borderColor: "border-transparent",
					borderWidth: "border-none",
					borderStyle: "border-none",
					rounded: "rounded-md",
				},
			},
			effects: {
				isApplied: false,
				properties: { shadow: "shadow-none", opacity: "opacity-100" },
			},
		},
	},
	size: {
		default: {
			size: {
				isApplied: true,
				properties: { paddingX: "px-4", height: "h-10" },
			},
		},
		sm: {
			size: {
				isApplied: true,
				properties: { paddingX: "px-3", height: "h-9" },
			},
		},
		lg: {
			size: {
				isApplied: true,
				properties: { paddingX: "px-8", height: "h-11" },
			},
		},
		icon: {
			size: {
				isApplied: true,
				properties: { paddingX: "px-10", height: "h-10" },
			},
		},
	},
};

export const useStyleManagerStore = create<
	ComponentStore<
		ButtonVariantName,
		ButtonSizeName,
		ButtonVariantStyle,
		ButtonSizeStyle
	>
>((set) => ({
	styles: DEFAULT_BUTTON_STYLE,
	currentVariant: {
		variant: "default",
		size: "default",
	},
	componentText: "Edit me",
	setComponentText: (value) => set({ componentText: value }),
	setStyleProperty: ({ styleType, styleName, group, property, value }) =>
		set((state) => {
			const newStyles = { ...state.styles };
			const stylesType = newStyles[styleType];

			// @ts-ignore
			const stylesTypeVariant = stylesType[styleName];
			stylesTypeVariant[group].properties[property] = value;

			return { styles: newStyles };
		}),
	toggleGroupIsApplied: ({ styleType, styleName, group }) =>
		set((state) => {
			const newStyles = { ...state.styles };
			const stylesType = newStyles[styleType];
			// @ts-ignore
			const stylesTypeVariant = stylesType[styleName];
			stylesTypeVariant[group].isApplied =
				!stylesTypeVariant[group].isApplied;
			return { styles: newStyles };
		}),
	setCurrentVariant: ({ styleType, name }) =>
		set((state) => ({
			currentVariant: { ...state.currentVariant, [styleType]: name },
		})),
}));
