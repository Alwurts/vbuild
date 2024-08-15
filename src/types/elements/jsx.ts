import type { TGenericComponentWithParent } from "./elements";
import type { TRootComponent } from "./layout";
import type { TailwindClassName } from "./tailwind";

type TElementBasic = string | number | boolean;

// Generic component abstract

type TGenericComponentParentAbstract = {
	parent: string;
};

type TGenericComponentAbstract = {
	key: string;
	children: string[] | null;
	className: TailwindClassName;
};

// Node abstract

export type TNodeAbstract =
	| (TGenericComponentAbstract & TRootComponent)
	| (TGenericComponentAbstract &
			TGenericComponentParentAbstract &
			TGenericComponentWithParent)
	| TElementBasic;

export type TNodesAbstract = {
	[key: string]: TNodeAbstract;
};
