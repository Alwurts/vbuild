import type { DivFlex } from "@/components/elements/DivFlex";
import type { Button } from "@/components/ui-editor/button";

export type TReactElement<T> = {
	key: string | null;
	/* ref: React.Ref<InferComponentRef<T>> | null; */
	props: Omit<InferComponentProps<T>, "children"> & {
		children: TReactNode | TReactNode[];
	};
};

export type TReactElementNode<T> = TReactElement<T> & {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	parent?: TReactElementNode<any> | TReactElement<any>;
};

export type TReactElementRoot = TReactElement<typeof DivFlex> & {
	type: "Root";
};

export type TButtonElement = TReactElementNode<typeof Button> & {
	type: "Button";
};

export type TDivFlexElement = TReactElementNode<typeof DivFlex> & {
	type: "DivFlex";
};

export type TElementComponent = TButtonElement | TDivFlexElement;

export type TElementBasic = string | number | boolean;

// Define the JSX tree as a recursive type
export type TReactNode =
	| TReactElementRoot
	| TElementBasic
	| TElementComponent
	| null;

/* // Define the JSX tree as a recursive type
export type TReactTree = TReactNode[]; */

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
