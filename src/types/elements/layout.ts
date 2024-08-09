import type { Root } from "@/components/elements/Root";
import type { TComponent, TGenericComponentParent } from "./jsx";
import type { Div } from "@/components/elements/Div";

export type TRootComponent = TComponent<typeof Root> & {
	type: "Root";
};

export type TDivComponent = TComponent<typeof Div> &
	TGenericComponentParent & {
		type: "Div";
	};
