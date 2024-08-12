import type { TGenericComponentInfer } from "./elements";

export type TH1Component = TGenericComponentInfer<
	React.HTMLAttributes<HTMLHeadingElement>
> & {
	type: "h1";
};

export type TH2Component = TGenericComponentInfer<
	React.HTMLAttributes<HTMLHeadingElement>
> & {
	type: "h2";
};

export type TH3Component = TGenericComponentInfer<
	React.HTMLAttributes<HTMLHeadingElement>
> & {
	type: "h3";
};

export type TH4Component = TGenericComponentInfer<
	React.HTMLAttributes<HTMLHeadingElement>
> & {
	type: "h4";
};

export type TH5Component = TGenericComponentInfer<
	React.HTMLAttributes<HTMLHeadingElement>
> & {
	type: "h5";
};

export type TH6Component = TGenericComponentInfer<
	React.HTMLAttributes<HTMLHeadingElement>
> & {
	type: "h6";
};

export type TPComponent = TGenericComponentInfer<
	React.HTMLAttributes<HTMLParagraphElement>
> & {
	type: "p";
};
