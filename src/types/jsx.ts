import type { TGenericComponent } from "./elements/elements";
import type { TRootComponent } from "./elements/layout";

export type TComponent<T> = {
	key: string;
	props: Omit<InferComponentProps<T>, "children"> & {};
	reactNode: React.ReactNode;
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
