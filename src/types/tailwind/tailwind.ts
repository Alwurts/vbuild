// Properties
const tailwindStylePropertyNames = [
	"width",
	"height",
	"padding",
	"margin",
	"display",
] as const;

export type TailwindStylePropertyName =
	(typeof tailwindStylePropertyNames)[number];

export type TailwindClassName = {
	[KeyType in TailwindStylePropertyName]: string | null;
};

export type TailwindClassNameRegex = {
	[K in TailwindStylePropertyName]: RegExp;
};

// Groups
const tailwindGroupName = ["size", "layout"] as const;

export type TailwindGroupName = (typeof tailwindGroupName)[number];

export type SizeGroup = {
	width: string;
	height: string;
};

export type LayoutGroup = {
	display: string;
	padding: string;
	margin: string;
};
