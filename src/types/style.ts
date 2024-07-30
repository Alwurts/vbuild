import type { ButtonSizeStyle, ButtonVariantStyle } from "./button";

// Base types
export type StyleGroup = "background" | "text" | "border" | "effects" | "size";

export type StyleProperty = {
	background: "bgColor";
	text: "textColor" | "fontSize" | "fontWeight";
	border: "borderColor" | "borderWidth" | "borderStyle" | "rounded";
	effects: "shadow" | "opacity";
	size: "height" | "paddingX";
};

// Generic style type
export type Style<T extends StyleGroup> = {
	isApplied: boolean;
	properties: {
		[K in StyleProperty[T]]: string;
	};
};

// Generic component style type
export type ComponentStyle<
	TVariant extends string,
	TSize extends string,
	TVariantStyle extends ButtonVariantStyle,
	TSizeStyle extends ButtonSizeStyle,
> = {
	variant: {
		[T in TVariant]: TVariantStyle;
	};
	size: {
		[T in TSize]: TSizeStyle;
	};
};
