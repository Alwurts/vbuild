import type { TGenericComponentsWithoutRoot } from "./elements";
import type { TRootComponent } from "./layout";
import type { TailwindClassNamesGroups } from "../tailwind/tailwind";

type TElementBasic = string | number | boolean;

// Generic component abstract

type TGenericComponentParentAbstract = {
	parent: string;
};

type TGenericComponentAbstract = {
	key: string;
	children: string[] | null;
	className: TailwindClassNamesGroups;
};

export type TGenericComponentsAbstract =
	| (TGenericComponentAbstract & TRootComponent)
	| (TGenericComponentAbstract &
			TGenericComponentParentAbstract &
			TGenericComponentsWithoutRoot);

// Node abstract
export type TNodeAbstract = TGenericComponentsAbstract | TElementBasic;

export type NonElementBasic<T> = T extends TElementBasic ? never : T;

export type TNodesAbstract = {
	[key: string]: TNodeAbstract;
};
