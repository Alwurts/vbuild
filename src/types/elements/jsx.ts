import type { TGenericComponent } from "./elements";
import type { TRootComponent } from "./layout";

export type TComponent<T> = {
	key: string;
	props: Omit<InferComponentProps<T>, "children"> & {};
};

// GenericComponent

export type TGenericComponentParent = {
	parent: string;
};

type TElementBasic = string | number | boolean;

// Abstract types

export type TComponentChildrenAbstract = {
	children: string[] | null;
};

export type TNodeAbstract =
	| (TComponentChildrenAbstract & (TRootComponent | TGenericComponent))
	| TElementBasic;

export type TNodesAbstract = {
	[key: string]: TNodeAbstract;
};

export type InferComponentProps<T> = T extends React.ComponentType<infer P>
	? P
	: never;