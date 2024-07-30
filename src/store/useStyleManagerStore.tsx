import type {
	ComponentType,
	AllComponentStyles,
	StyleGroup,
} from "@/types/style";
import type { ComponentStore } from "@/types/store";
import { create } from "zustand";
import { DEFAULT_BUTTON_STYLE } from "@/lib/components/buttonStyles";
import { DEFAULT_BADGE_STYLE } from "@/lib/components/badgeStyles";
import { DEFAULT_CARD_STYLE } from "@/lib/components/cardStyles";
import type { CSSVariableNames } from "@/types/style";

const DEFAULT_STYLES: AllComponentStyles = {
	button: DEFAULT_BUTTON_STYLE,
	badge: DEFAULT_BADGE_STYLE,
	card: DEFAULT_CARD_STYLE,
};

type CSSVariablesState = {
	[K in CSSVariableNames]: string;
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
			// @ts-ignore (due to dynamic access)
			const stylesType = componentStyles[styleType];
			const stylesTypeVariant = stylesType[styleName];
			stylesTypeVariant[group].properties[property] = value;
			return { styles: newStyles };
		}),
	toggleGroupIsApplied: ({ component, styleType, styleName, group }) =>
		set((state) => {
			const newStyles = { ...state.styles };
			const componentStyles = newStyles[component];
			// @ts-ignore (due to dynamic access)
			const stylesType = componentStyles[styleType];
			const stylesTypeVariant = stylesType[styleName];
			stylesTypeVariant[group].isApplied = !stylesTypeVariant[group].isApplied;
			return { styles: newStyles };
		}),
	setCurrentVariant: ({ styleType, name }) =>
		set((state) => ({
			currentVariant: { ...state.currentVariant, [styleType]: name },
		})),

	cssVariables: undefined,
	setCSSVariables: (
		variables: {
			[K in CSSVariableNames]: string;
		},
	) =>
		set((state) => {
			return { cssVariables: variables };
		}),
	setCSSVariable: (name: CSSVariableNames, value: string) =>
		set((state) => {
			console.log(name, value)
			if (!state.cssVariables) return state;
			document.documentElement.style.setProperty(`--${name}`, value);
			return {
				cssVariables: {
					...state.cssVariables,
					[name]: value,
				},
			};
		}),
}));