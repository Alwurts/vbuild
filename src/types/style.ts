export type VariantStyleGroup = "background" | "text" | "border" | "effects";
export type SizeStyleGroup = "size";

export type VariantStyleProperty =
	| "bgColor"
	| "textColor"
	| "fontSize"
	| "fontWeight"
	| "borderColor"
	| "borderWidth"
	| "borderStyle"
	| "rounded"
	| "shadow"
	| "opacity";

export type SizeStyleProperty = "height" | "paddingX";

export type ButtonVariantName =
	| "default"
	| "destructive"
	| "outline"
	| "secondary"
	| "ghost"
	| "link";

export type ButtonSizeName = "default" | "sm" | "lg" | "icon";

export type ButtonVariant = {
	styleName: ButtonVariantName;
	background: {
		isApplied: boolean;
		properties: {
			bgColor: string;
		};
	};
	text: {
		isApplied: boolean;
		properties: {
			textColor: string;
			fontSize: string;
			fontWeight: string;
		};
	};
	border: {
		isApplied: boolean;
		properties: {
			borderColor: string;
			borderWidth: string;
			borderStyle: string;
			rounded: string;
		};
	};
	effects: {
		isApplied: boolean;
		properties: {
			shadow: string;
			opacity: string;
		};
	};
};

export type ButtonSize = {
	styleName: ButtonSizeName;
	size: {
		isApplied: boolean;
		properties: {
			paddingX: string;
			height: string;
		};
	};
};
