import { z } from "zod";

// Properties
const tailwindStylePropertyNames = [
	"width",
	"height",
	"padding",
	"margin",
	"display",
	"flexDirection",
	"justifyContent",
	"alignItems",
	"gridTemplateColumns",
	"gridTemplateRows",
	"gap",
] as const;

export type TailwindStylePropertyName =
	(typeof tailwindStylePropertyNames)[number];

export type TailwindClassName = {
	[KeyType in TailwindStylePropertyName]?: string;
};

export type TailwindClassNameRegex = {
	[K in TailwindStylePropertyName]: RegExp;
};

// Groups
const tailwindGroupName = ["size", "layout"] as const;

export type TailwindGroupName = (typeof tailwindGroupName)[number];

export const schemaSizeGroup = z.object({
	width: z.string(),
	height: z.string(),
});

type SizeGroup = z.infer<typeof schemaSizeGroup>;

const schemaLayoutBlockGroup = z.object({
	display: z.literal("block"),
	padding: z.string(),
});

const schemaLayoutFlexGroup = z.object({
	display: z.literal("flex"),
	flexDirection: z.string(),
	justifyContent: z.string(),
	alignItems: z.string(),
	padding: z.string(),
	gap: z.string(),
});

const schemaLayoutGridGroup = z.object({
	display: z.literal("grid"),
	gridTemplateColumns: z.string(),
	gridTemplateRows: z.string(),
	padding: z.string(),
	gap: z.string(),
});

const schemaLayoutHiddenGroup = z.object({
	display: z.literal("hidden"),
});

export const schemaLayoutGroup = z.union([
	schemaLayoutBlockGroup,
	schemaLayoutFlexGroup,
	schemaLayoutGridGroup,
	schemaLayoutHiddenGroup,
]);

const tailwindClassNameGroupsSchema = z.object({
	size: schemaSizeGroup.optional(),
	layout: schemaLayoutGroup.optional(),
});

export type TailwindClassNamesGroups = z.infer<
	typeof tailwindClassNameGroupsSchema
>;
