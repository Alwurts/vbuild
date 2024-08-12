import type { TComponent, TGenericComponentParent } from "./jsx";

export type TH1Component = TComponent<
	React.HTMLAttributes<HTMLHeadingElement>
> &
	TGenericComponentParent & {
		type: "h1";
	};

export type TH2Component = TComponent<
	React.HTMLAttributes<HTMLHeadingElement>
> &
	TGenericComponentParent & {
		type: "h2";
	};

export type TH3Component = TComponent<
	React.HTMLAttributes<HTMLHeadingElement>
> &
	TGenericComponentParent & {
		type: "h3";
	};

export type TH4Component = TComponent<
	React.HTMLAttributes<HTMLHeadingElement>
> &
	TGenericComponentParent & {
		type: "h4";
	};

export type TH5Component = TComponent<
	React.HTMLAttributes<HTMLHeadingElement>
> &
	TGenericComponentParent & {
		type: "h5";
	};

export type TH6Component = TComponent<
	React.HTMLAttributes<HTMLHeadingElement>
> &
	TGenericComponentParent & {
		type: "h6";
	};

export type TPComponent = TComponent<
	React.HTMLAttributes<HTMLParagraphElement>
> &
	TGenericComponentParent & {
		type: "p";
	};
