import type {
	ButtonStyleName,
	ButtonStyle,
	StyleGroup,
	StyleProperty,
} from "@/types/style";

export interface ButtonStore {
	styles: {
		[key in ButtonStyleName]: ButtonStyle;
	};
	currentStyle: ButtonStyleName;
	text: string;
	setStyle: (
		styleName: ButtonStyleName,
		group: StyleGroup,
		property: StyleProperty,
		value: string,
	) => void;
	setCurrentStyle: (styleName: ButtonStyleName) => void;
}
