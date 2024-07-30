import type { ButtonStore } from "@/types/store";
import type { ButtonSize, ButtonVariant } from "@/types/style";
import { create } from "zustand";

const DEFAULT_BUTTON_VARIANT: Omit<ButtonVariant, "styleName"> = {
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

	effects: {
		isApplied: false,
		properties: {
			shadow: "shadow-none",
			opacity: "opacity-100",
		},
	},
};

export const DEFAULT_BUTTON_SIZE: Omit<ButtonSize, "styleName"> = {
	size: {
		isApplied: true,
		properties: {
			paddingX: "px-4",
			height: "h-10",
		},
	},
};

export const useStyleManagerStore = create<ButtonStore>((set) => ({
	variants: {
		size: [
			{
				styleName: "sm",
				...DEFAULT_BUTTON_SIZE,
				size: {
					...DEFAULT_BUTTON_SIZE.size,
					properties: {
						...DEFAULT_BUTTON_SIZE.size.properties,
						height: "h-9",
						paddingX: "px-3",
					},
				},
			},
			{
				styleName: "default",
				...DEFAULT_BUTTON_SIZE,
			},
			{
				styleName: "lg",
				...DEFAULT_BUTTON_SIZE,
				size: {
					...DEFAULT_BUTTON_SIZE.size,
					properties: {
						...DEFAULT_BUTTON_SIZE.size.properties,
						height: "h-11",
						paddingX: "px-8",
					},
				},
			},
			{
				styleName: "icon",
				...DEFAULT_BUTTON_SIZE,
				size: {
					...DEFAULT_BUTTON_SIZE.size,
					properties: {
						...DEFAULT_BUTTON_SIZE.size.properties,
						height: "h-10",
						paddingX: "px-10",
					},
				},
			},
		],
		variant: [
			{
				styleName: "default",
				...DEFAULT_BUTTON_VARIANT,
			},
			{
				styleName: "destructive",
				...DEFAULT_BUTTON_VARIANT,
				background: {
					...DEFAULT_BUTTON_VARIANT.background,
					properties: {
						bgColor: "bg-destructive",
					},
				},
				text: {
					...DEFAULT_BUTTON_VARIANT.text,
					properties: {
						...DEFAULT_BUTTON_VARIANT.text.properties,
						textColor: "text-destructive-foreground",
					},
				},
			},
			{
				styleName: "outline",
				...DEFAULT_BUTTON_VARIANT,
				background: {
					...DEFAULT_BUTTON_VARIANT.background,
					properties: {
						bgColor: "bg-background",
					},
				},
				text: {
					...DEFAULT_BUTTON_VARIANT.text,
					properties: {
						...DEFAULT_BUTTON_VARIANT.text.properties,
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
				...DEFAULT_BUTTON_VARIANT,
				background: {
					...DEFAULT_BUTTON_VARIANT.background,
					properties: {
						bgColor: "bg-secondary",
					},
				},
				text: {
					...DEFAULT_BUTTON_VARIANT.text,
					properties: {
						...DEFAULT_BUTTON_VARIANT.text.properties,
						textColor: "text-secondary-foreground",
					},
				},
			},
			{
				styleName: "ghost",
				...DEFAULT_BUTTON_VARIANT,
				background: {
					...DEFAULT_BUTTON_VARIANT.background,
					properties: {
						bgColor: "bg-transparent",
					},
				},
				text: {
					...DEFAULT_BUTTON_VARIANT.text,
					properties: {
						...DEFAULT_BUTTON_VARIANT.text.properties,
						textColor: "text-foreground",
					},
				},
			},
			{
				styleName: "link",
				...DEFAULT_BUTTON_VARIANT,
				background: {
					...DEFAULT_BUTTON_VARIANT.background,
					properties: {
						bgColor: "bg-transparent",
					},
				},
				text: {
					...DEFAULT_BUTTON_VARIANT.text,
					properties: {
						...DEFAULT_BUTTON_VARIANT.text.properties,
						textColor: "text-primary",
					},
				},
			},
		],
	},
	currentVariant: {
		variant: "default",
		size: "default",
	},
	buttonText: "Edit me",
	setGroupStyleProperty: ({
		variantType,
		variantName,
		groupStyleName,
		property,
		value,
	}) => {
		set((state) => {
			if (variantType === "variant") {
				const variantStyles = state.variants[variantType];
				const currentVariantStyleIndex = variantStyles.findIndex(
					(style) => style.styleName === variantName,
				);
				const currentVariantStyle = variantStyles[currentVariantStyleIndex];
				const groupStyle = currentVariantStyle[groupStyleName];
				const updatedGroupStyle = {
					...groupStyle,
					properties: {
						...groupStyle.properties,
						[property]: value,
					},
				};
				variantStyles[currentVariantStyleIndex] = {
					...currentVariantStyle,
					[groupStyleName]: updatedGroupStyle,
				};
				return {
					variants: {
						...state.variants,
						variant: variantStyles,
					},
				};
			}
			const sizeStyles = state.variants[variantType];
			const currentSizeStyleIndex = sizeStyles.findIndex(
				(style) => style.styleName === variantName,
			);

			const currentSizeStyle = sizeStyles[currentSizeStyleIndex];
			const groupStyle = currentSizeStyle[groupStyleName];
			const updatedGroupStyle = {
				...groupStyle,
				properties: {
					...groupStyle.properties,
					[property]: value,
				},
			};

			sizeStyles[currentSizeStyleIndex] = {
				...currentSizeStyle,
				[groupStyleName]: updatedGroupStyle,
			};

			return {
				variants: {
					...state.variants,
					size: sizeStyles,
				},
			};
		});
	},
	toggleGroupIsApplied: ({ variantType, styleName, group }) => {
		set((state) => {
			if (variantType === "variant") {
				const updatedVariant = state.variants[variantType].map((style) =>
					style.styleName === styleName
						? {
								...style,
								[group]: {
									...style[group],
									isApplied: !style[group].isApplied,
								},
							}
						: style,
				);
				return {
					variants: {
						...state.variants,
						variant: updatedVariant,
					},
				};
			}
			const updatedSize = state.variants[variantType].map((style) =>
				style.styleName === styleName
					? {
							...style,
							[group]: {
								...style[group],
								isApplied: !style[group].isApplied,
							},
						}
					: style,
			);
			return {
				variants: {
					...state.variants,
					size: updatedSize,
				},
			};
		});
	},
	setCurrentVariant: ({ variantType, name }) =>
		set((state) => ({
			...state,
			currentVariant: { ...state.currentVariant, [variantType]: name },
		})),
}));
