import type { Div } from "@/components/elements/Div";
import type { Root } from "@/components/elements/Root";
import type { Button } from "@/components/ui-editor/button";
import type {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { TComponent, TGenericComponentParent } from "../jsx";
import type {
	TCardComponent,
	TCardHeaderComponent,
	TCardContentComponent,
	TCardFooterComponent,
	TCardTitleComponent,
	TCardDescriptionComponent,
} from "./card";
import type { TDivComponent } from "./layout";
import type { TButtonComponent } from "./button";

const GenericComponentsNames = {
	Root: "Root",
	Button: "Button",
	Div: "Div",
	Card: "Card",
	CardHeader: "CardHeader",
	CardContent: "CardContent",
	CardFooter: "CardFooter",
	CardTitle: "CardTitle",
	CardDescription: "CardDescription",
} as const;

type GenericComponentName =
	(typeof GenericComponentsNames)[keyof typeof GenericComponentsNames];

export type TGenericComponent =
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
