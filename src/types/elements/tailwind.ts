export type TailwindType = "Width" | "Height" | "Padding" | "Margin";

export type TailwindClassNameRegex = {
	[K in TailwindType]: RegExp;
};

export type TailwindGroupNames = "Size" | "Layout";

export type TailwindGroups = {
	[K in TailwindGroupNames]: TailwindType[];
};

export type TailwindClassName = {
	[KeyGroup in TailwindGroupNames]?: {
		[KeyType in TailwindType]?: string;
	};
};
