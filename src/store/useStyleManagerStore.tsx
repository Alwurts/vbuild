import type { ButtonStore } from "@/types/store";
import type { ButtonStyle, StyleGroup, StyleProperty } from "@/types/style";
import { create } from "zustand";

const DEFAULT_BUTTON_STYLE: Omit<ButtonStyle, "styleName"> = {
	background: {
		isApplied: true,
		properties: {
			bgColor: "bg-primary",
		},
	},
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
	size: {
		isApplied: false,
		properties: {
			paddingX: "px-4",
			height: "h-10",
		},
	},
	effects: {
		isApplied: false,
		properties: {
			shadow: "shadow-none",
			opacity: "opacity-100",
		},
	},
};

export const useStyleManagerStore = create<ButtonStore>((set) => ({
	styles: [
		{
			styleName: "default",
			...DEFAULT_BUTTON_STYLE,
		},
		{
			styleName: "destructive",
			...DEFAULT_BUTTON_STYLE,
			background: {
				...DEFAULT_BUTTON_STYLE.background,
				properties: {
					bgColor: "bg-destructive",
				},
			},
			text: {
				...DEFAULT_BUTTON_STYLE.text,
				properties: {
					...DEFAULT_BUTTON_STYLE.text.properties,
					textColor: "text-destructive-foreground",
				},
			},
		},
		{
			styleName: "outline",
			...DEFAULT_BUTTON_STYLE,
			background: {
				...DEFAULT_BUTTON_STYLE.background,
				properties: {
					bgColor: "bg-background",
				},
			},
			text: {
				...DEFAULT_BUTTON_STYLE.text,
				properties: {
					...DEFAULT_BUTTON_STYLE.text.properties,
					textColor: "text-foreground",
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
		},
		{
			styleName: "secondary",
			...DEFAULT_BUTTON_STYLE,
			background: {
				...DEFAULT_BUTTON_STYLE.background,
				properties: {
					bgColor: "bg-secondary",
				},
			},
			text: {
				...DEFAULT_BUTTON_STYLE.text,
				properties: {
					...DEFAULT_BUTTON_STYLE.text.properties,
					textColor: "text-secondary-foreground",
				},
			},
		},
		{
			styleName: "ghost",
			...DEFAULT_BUTTON_STYLE,
			background: {
				...DEFAULT_BUTTON_STYLE.background,
				properties: {
					bgColor: "bg-transparent",
				},
			},
			text: {
				...DEFAULT_BUTTON_STYLE.text,
				properties: {
					...DEFAULT_BUTTON_STYLE.text.properties,
					textColor: "text-foreground",
				},
			},
		},
		{
			styleName: "link",
			...DEFAULT_BUTTON_STYLE,
			background: {
				...DEFAULT_BUTTON_STYLE.background,
				properties: {
					bgColor: "bg-transparent",
				},
			},
			text: {
				...DEFAULT_BUTTON_STYLE.text,
				properties: {
					...DEFAULT_BUTTON_STYLE.text.properties,
					textColor: "text-primary",
				},
			},
		},
	],
	currentStyle: "default",
	text: "Edit me",
	setGroupStyleProperty: (styleName, group, property, value) => {
		console.log(`Setting style: ${styleName}, ${group}, ${property}, ${value}`);
		set((state) => {
			const updatedStyles = state.styles.map((style) =>
				style.styleName === styleName
					? updateNestedProperty(style, group, property, value)
					: style,
			);
			console.log("Updated styles:", updatedStyles);
			return { styles: updatedStyles };
		});
	},
	toggleGroupIsApplied: (styleName, group) => {
		set((state) => {
			const updatedStyles = state.styles.map((style) =>
				style.styleName === styleName
					? {
							...style,
							[group]: { ...style[group], isApplied: !style[group].isApplied },
						}
					: style,
			);
			return { styles: updatedStyles };
		});
	},
	setCurrentStyle: (styleName) => set({ currentStyle: styleName }),
}));

function updateNestedProperty(
	style: ButtonStyle,
	styleGroup: StyleGroup,
	property: StyleProperty,
	value: string,
): ButtonStyle {
	const updatedStyle = {
		...style,
		[styleGroup]: {
			...style[styleGroup],
			properties: {
				...style[styleGroup].properties,
				[property]: value,
			},
		},
	};

	console.log("Updated style:", updatedStyle);
	return updatedStyle;
}
