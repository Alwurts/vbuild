import type {
	ButtonSize,
	ButtonVariantName,
	ButtonVariant,
	VariantStyleGroup,
	VariantStyleProperty,
	ButtonSizeName,
	SizeStyleGroup,
	SizeStyleProperty,
} from "@/types/style";

export interface ButtonStore {
	variants: {
		variant: ButtonVariant[];
		size: ButtonSize[];
	};
	currentVariant: {
		variant: ButtonVariantName;
		size: ButtonSizeName;
	};
	buttonText: string;
	setGroupStyleProperty: ({
		variantType,
		variantName,
		groupStyleName,
		property,
		value,
	}:
		| {
				variantType: "variant";
				variantName: ButtonVariantName;
				groupStyleName: VariantStyleGroup;
				property: VariantStyleProperty;
				value: string;
		  }
		| {
				variantType: "size";
				variantName: ButtonSizeName;
				groupStyleName: SizeStyleGroup;
				property: SizeStyleProperty;
				value: string;
		  }) => void;
	toggleGroupIsApplied: ({
		variantType,
		styleName,
		group,
	}:
		| {
				variantType: "variant";
				styleName: ButtonVariantName;
				group: VariantStyleGroup;
		  }
		| {
				variantType: "size";
				styleName: ButtonSizeName;
				group: SizeStyleGroup;
		  }) => void;
	setCurrentVariant: ({
		variantType,
		name,
	}:
		| {
				variantType: "variant";
				name: ButtonVariantName;
		  }
		| {
				variantType: "size";
				name: ButtonSizeName;
		  }) => void;
}
