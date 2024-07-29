export type StyleGroup = "background" | "text" | "border" | "size" | "effects";

export type StyleProperty =
	| "bgColor"
	| "textColor"
	| "fontSize"
	| "fontWeight"
	| "borderColor"
	| "borderWidth"
	| "borderStyle"
	| "rounded"
	| "paddingX"
	| "height"
	| "shadow"
	| "opacity";

export type ButtonStyleName =
	| "default"
	| "destructive"
	| "outline"
	| "secondary"
	| "ghost"
	| "link";

export type ButtonStyle = {
	styleName: ButtonStyleName;
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
	size: {
		isApplied: boolean;
		properties: {
			paddingX: string;
			height: string;
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
