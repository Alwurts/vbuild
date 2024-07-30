import type { Style, StyleGroup } from "./style";

// Component-specific types
export type ButtonVariantName =
	| "default"
	| "destructive"
	| "outline"
	| "secondary"
	| "ghost"
	| "link";
export type ButtonSizeName = "default" | "sm" | "lg" | "icon";

export type ButtonVariantStyle = {
	[K in Exclude<StyleGroup, "size">]: Style<K>;
};

/* export type ButtonSizeStyle = Style<"size">; */
export type ButtonSizeStyle = {
	size: Style<"size">;
};

export type ButtonStyle = {
	variant: {
		[K in ButtonVariantName]: ButtonVariantStyle;
	};
	size: {
		[K in ButtonSizeName]: ButtonSizeStyle;
	};
};
