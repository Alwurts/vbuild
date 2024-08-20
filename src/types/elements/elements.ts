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
import type {
	TailwindClassName,
	TailwindGroupName,
} from "../tailwind/tailwind";

export type TGenericComponentInfer<T> = {
	props: Omit<InferComponentProps<T>, "children" | "className">;
};

type InferComponentProps<T> = T extends React.ComponentType<infer P>
	? P
	: never;

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

export type TGenericComponentsWithoutRoot =
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

export type TGenericComponents = TRootComponent | TGenericComponentsWithoutRoot;

export function isValidComponentName(
	name: unknown,
): name is GenericComponentName {
	const GenericComponentNames = Object.values(GenericComponentsNames);
	return (
		typeof name === "string" &&
		GenericComponentNames.includes(name as GenericComponentName)
	);
}

export type TGenericComponentRegistryEntry = Omit<
	TGenericComponents,
	"props"
> & {
	icon: React.ReactNode;
	component: React.ReactNode;
	dependencies: string[];
	draggable: boolean;
	droppable: boolean;
	editable: boolean;
	classNameGroups: Partial<
		Record<
			TailwindGroupName,
			{
				name: TailwindGroupName;
				disabled?: boolean;
			}
		>
	>;
	defaultClassNameProperties: Partial<TailwindClassName>;
};

export type TGenericComponentRegistry = {
	[key in GenericComponentName]: TGenericComponentRegistryEntry;
};
