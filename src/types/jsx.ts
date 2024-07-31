import type { DivFlex } from "@/components/elements/DivFlex";
import type { Button } from "@/components/ui-editor/button";

type TComponent<T> = {
	key: string;
	props: Omit<InferComponentProps<T>, "children"> & {};
};

// GenericComponent

type TGenericComponentParent = {
	parent: string;
};

// RootComponent
export type TRootComponent = TComponent<typeof DivFlex> & {
	type: "Root";
};

// Different GenericComponent's

export type TButtonComponent = TComponent<typeof Button> &
	TGenericComponentParent & {
		type: "Button";
	};

export type TDivFlexComponent = TComponent<typeof DivFlex> &
	TGenericComponentParent & {
		type: "DivFlex";
	};

type TElementBasic = string | number | boolean;

export type TGenericComponent = TButtonComponent | TDivFlexComponent;

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

// Tree types

type TComponentChildrenTree = {
	children: TNodeTree[] | null;
};

export type TNodeTree =
	| (TComponentChildrenTree & (TRootComponent | TGenericComponent))
	| TElementBasic;

export type InferComponentProps<T> = T extends React.ComponentType<infer P>
	? P
	: never;

/* export type InferComponentRef<T> = T extends React.ForwardRefExoticComponent<
	React.RefAttributes<infer R>
>
	? R
	: // biome-ignore lint/suspicious/noExplicitAny: <explanation>
		T extends React.ComponentClass<any>
		? T
		: never; */
