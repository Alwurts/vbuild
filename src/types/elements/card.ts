import type {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { TGenericComponentInfer } from "./elements";

export type TCardComponent = TGenericComponentInfer<typeof Card> & {
	type: "Card";
};

export type TCardHeaderComponent = TGenericComponentInfer<typeof CardHeader> & {
	type: "CardHeader";
};

export type TCardContentComponent = TGenericComponentInfer<
	typeof CardContent
> & {
	type: "CardContent";
};

export type TCardFooterComponent = TGenericComponentInfer<typeof CardFooter> & {
	type: "CardFooter";
};

export type TCardTitleComponent = TGenericComponentInfer<typeof CardTitle> & {
	type: "CardTitle";
};

export type TCardDescriptionComponent = TGenericComponentInfer<
	typeof CardDescription
> & {
	type: "CardDescription";
};
