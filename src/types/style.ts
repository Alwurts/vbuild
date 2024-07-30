import type { BadgeComponentStyle } from "./badge";
import type {
	ButtonComponentStyle,
	ButtonSizeStyle,
	ButtonVariantStyle,
} from "./button";
import type { CardComponentStyle } from "./card";

// Base types
export type StyleGroup =
	| "background"
	| "text"
	| "border"
	| "effects"
	| "size"
	| "padding";

export type StyleProperty = {
	background: "bgColor";
	text: "textColor" | "fontSize" | "fontWeight";
	border: "borderColor" | "borderWidth" | "borderStyle" | "rounded";
	effects: "shadow" | "opacity";
	size: "height" | "paddingX" | "paddingY";
	padding: "paddingX" | "paddingY";
};

// Generic style type
export type Style<T extends StyleGroup> = {
	isApplied: boolean;
	properties: {
		[K in StyleProperty[T]]?: string;
	};
};

// Generic component style type
export type ComponentStyle<
	TVariant extends string,
	TSize extends string,
	TVariantStyle,
	TSizeStyle,
> = {
	variant: {
		[T in TVariant]: TVariantStyle;
	};
	size?: {
		[T in TSize]: TSizeStyle;
	};
};

export type ComponentType = "button" | "badge" | "card";

// Add a new type for all component styles
export type AllComponentStyles = {
	button: ButtonComponentStyle;
	badge: BadgeComponentStyle;
	card: CardComponentStyle;
};

export enum CSSVariableNames {
	background = "background",
	foreground = "foreground",
	card = "card",
	"card-foreground" = "card-foreground",
	popover = "popover",
	"popover-foreground" = "popover-foreground",
	primary = "primary",
	"primary-foreground" = "primary-foreground",
	secondary = "secondary",
	"secondary-foreground" = "secondary-foreground",
	muted = "muted",
	"muted-foreground" = "muted-foreground",
	accent = "accent",
	"accent-foreground" = "accent-foreground",
	destructive = "destructive",
	"destructive-foreground" = "destructive-foreground",
	border = "border",
	input = "input",
	ring = "ring",
	radius = "radius",
}
