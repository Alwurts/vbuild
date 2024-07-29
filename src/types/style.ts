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
	background: {
		bgColor: string;
	};
	text: {
		textColor: string;
		fontSize: string;
		fontWeight: string;
	};
	border?: {
		borderColor: string;
		borderWidth: string;
		borderStyle: string;
		rounded: string;
	};
	size?: {
		paddingX: string;
		height: string;
	};
	effects?: {
		shadow: string;
		opacity: string;
	};
};
