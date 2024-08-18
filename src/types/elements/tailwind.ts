export type TailwindType = "Width" | "Height" | "Padding" | "Margin" | "Display" | "Direction" | "Justify" | "Align" | "Gap";

export type TailwindClassNameRegex = {
	[K in TailwindType]: RegExp;
};

export type TailwindGroupName = "Size" | "Layout";

export type TailwindGroups = {
	[K in TailwindGroupName]: TailwindType[];
};

export type TailwindClassName = {
	[KeyGroup in TailwindGroupName]?: {
		[KeyType in TailwindType]?: string;
	};
};
