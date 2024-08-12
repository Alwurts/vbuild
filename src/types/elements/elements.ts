import type {
	TCardComponent,
	TCardHeaderComponent,
	TCardContentComponent,
	TCardFooterComponent,
	TCardTitleComponent,
	TCardDescriptionComponent,
} from "@/types/elements/card";
import type {
	TDivComponent,
	TRootComponent,
	TSpanComponent,
} from "@/types/elements/layout";
import type { TButtonComponent } from "@/types/elements/button";
import type {
	TH1Component,
	TH2Component,
	TH3Component,
	TH4Component,
	TH5Component,
	TH6Component,
	TPComponent,
} from "@/types/elements/text";

const GenericComponentsNames = {
	Root: "Root",
	div: "div",
	span: "span",
	h1: "h1",
	h2: "h2",
	h3: "h3",
	h4: "h4",
	h5: "h5",
	h6: "h6",
	p: "p",
	Button: "Button",
	Card: "Card",
	CardHeader: "CardHeader",
	CardContent: "CardContent",
	CardFooter: "CardFooter",
	CardTitle: "CardTitle",
	CardDescription: "CardDescription",
} as const;

export type GenericComponentName =
	(typeof GenericComponentsNames)[keyof typeof GenericComponentsNames];

export type TGenericComponent =
	| TRootComponent
	| TDivComponent
	| TSpanComponent
	| TH1Component
	| TH2Component
	| TH3Component
	| TH4Component
	| TH5Component
	| TH6Component
	| TPComponent
	| TButtonComponent
	| TDivComponent
	| TCardComponent
	| TCardHeaderComponent
	| TCardContentComponent
	| TCardFooterComponent
	| TCardTitleComponent
	| TCardDescriptionComponent;

export function isValidComponentName(
	name: unknown,
): name is GenericComponentName {
	const GenericComponentNames = Object.values(GenericComponentsNames);
	return (
		typeof name === "string" &&
		GenericComponentNames.includes(name as GenericComponentName)
	);
}
