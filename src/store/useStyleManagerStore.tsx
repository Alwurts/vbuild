import type { ButtonComponentStyle } from "@/types/button";
import type { BadgeComponentStyle } from "@/types/badge";
import type {
	ComponentType,
	AllComponentStyles,
	StyleGroup,
} from "@/types/style";
import type { ComponentStore } from "@/types/store";
import { create } from "zustand";

const DEFAULT_BUTTON_STYLE: ButtonComponentStyle = {
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

const DEFAULT_BADGE_STYLE: BadgeComponentStyle = {
	variant: {
		default: {
			background: { isApplied: true, properties: { bgColor: "bg-primary" } },
			text: {
				isApplied: true,
				properties: {
					textColor: "text-primary-foreground",
					fontSize: "text-xs",
					fontWeight: "font-semibold",
				},
			},
			border: {
				isApplied: true,
				properties: {
					borderColor: "border-transparent",
					borderWidth: "border",
					borderStyle: "border-solid",
					rounded: "rounded-full",
				},
			},
			effects: {
				isApplied: true,
				properties: { shadow: "shadow-none", opacity: "opacity-100" },
			},
		},
		secondary: {
			background: { isApplied: true, properties: { bgColor: "bg-primary" } },
			text: {
				isApplied: true,
				properties: {
					textColor: "text-primary-foreground",
					fontSize: "text-xs",
					fontWeight: "font-semibold",
				},
			},
			border: {
				isApplied: true,
				properties: {
					borderColor: "border-transparent",
					borderWidth: "border",
					borderStyle: "border-solid",
					rounded: "rounded-full",
				},
			},
			effects: {
				isApplied: true,
				properties: { shadow: "shadow-none", opacity: "opacity-100" },
			},
		},
		destructive: {
			background: { isApplied: true, properties: { bgColor: "bg-primary" } },
			text: {
				isApplied: true,
				properties: {
					textColor: "text-primary-foreground",
					fontSize: "text-xs",
					fontWeight: "font-semibold",
				},
			},
			border: {
				isApplied: true,
				properties: {
					borderColor: "border-transparent",
					borderWidth: "border",
					borderStyle: "border-solid",
					rounded: "rounded-full",
				},
			},
			effects: {
				isApplied: true,
				properties: { shadow: "shadow-none", opacity: "opacity-100" },
			},
		},
		outline: {
			background: { isApplied: true, properties: { bgColor: "bg-primary" } },
			text: {
				isApplied: true,
				properties: {
					textColor: "text-primary-foreground",
					fontSize: "text-xs",
					fontWeight: "font-semibold",
				},
			},
			border: {
				isApplied: true,
				properties: {
					borderColor: "border-transparent",
					borderWidth: "border",
					borderStyle: "border-solid",
					rounded: "rounded-full",
				},
			},
			effects: {
				isApplied: true,
				properties: { shadow: "shadow-none", opacity: "opacity-100" },
			},
		},
	},
};

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
