import type {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { TComponent, TGenericComponentParent } from "./jsx";

export type TCardComponent = TComponent<typeof Card> &
	TGenericComponentParent & {
		type: "Card";
	};

export type TCardHeaderComponent = TComponent<typeof CardHeader> &
	TGenericComponentParent & {
		type: "CardHeader";
	};

export type TCardContentComponent = TComponent<typeof CardContent> &
	TGenericComponentParent & {
		type: "CardContent";
	};

export type TCardFooterComponent = TComponent<typeof CardFooter> &
	TGenericComponentParent & {
		type: "CardFooter";
	};

export type TCardTitleComponent = TComponent<typeof CardTitle> &
	TGenericComponentParent & {
		type: "CardTitle";
	};

export type TCardDescriptionComponent = TComponent<typeof CardDescription> &
	TGenericComponentParent & {
		type: "CardDescription";
	};
