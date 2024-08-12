import type { Root } from "@/components/elements/Root";
import type { TComponent, TGenericComponentParent } from "./jsx";

export type TRootComponent = TComponent<typeof Root> & {
	type: "Root";
};

export type TDivComponent = TComponent<React.HTMLAttributes<HTMLDivElement>> &
	TGenericComponentParent & {
		type: "div";
	};

export type TSpanComponent = TComponent<React.HTMLAttributes<HTMLSpanElement>> &
	TGenericComponentParent & {
		type: "span";
	};
