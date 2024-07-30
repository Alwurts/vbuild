import type { ButtonSizeStyle, ButtonVariantStyle } from "./button";
import type { ComponentStyle, Style, StyleGroup, StyleProperty } from "./style";

export interface ComponentStore<
	TVariant extends string,
	TSize extends string,
	TVariantStyle extends ButtonVariantStyle,
	TSizeStyle extends ButtonSizeStyle,
> {
	styles: ComponentStyle<TVariant, TSize, TVariantStyle, TSizeStyle>;
	currentVariant: {
		variant: TVariant;
		size: TSize;
	};
	componentText: string;
	setComponentText: (value: string) => void;
	setStyleProperty: <TGroup extends StyleGroup>(params: {
		styleType: "variant" | "size";
		styleName: TVariant | TSize;
		group: TGroup;
		property: StyleProperty[TGroup];
		value: string;
	}) => void;
	toggleGroupIsApplied: (params: {
		styleType: "variant" | "size";
		styleName: TVariant | TSize;
		group: StyleGroup;
	}) => void;
	setCurrentVariant: (params: {
		styleType: "variant" | "size";
		name: TVariant | TSize;
	}) => void;
}
