import type Root from "@/components/elements/Root";
import type { TGenericComponentInfer } from "./elements";

export type TRootComponent = TGenericComponentInfer<typeof Root> & {
	type: "Root";
};

export type TDivComponent = TGenericComponentInfer<
	React.HTMLAttributes<HTMLDivElement>
> & {
	type: "div";
};

export type TSpanComponent = TGenericComponentInfer<
	React.HTMLAttributes<HTMLSpanElement>
> & {
	type: "span";
};
