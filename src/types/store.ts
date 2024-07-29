import type {
	ButtonStyleName,
	ButtonStyle,
	StyleGroup,
	StyleProperty,
} from "@/types/style";

export interface ButtonStore {
	styles: ButtonStyle[];
	currentStyle: ButtonStyleName;
	text: string;
	setGroupStyleProperty: (
		styleName: ButtonStyleName,
		group: StyleGroup,
		property: StyleProperty,
		value: string,
	) => void;
	toggleGroupIsApplied: (styleName: ButtonStyleName, group: StyleGroup) => void;
	setCurrentStyle: (styleName: ButtonStyleName) => void;
}
