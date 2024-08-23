import { z } from "zod";

// Properties
const tailwindStylePropertyNames = [
	"width",
	"height",
	"display",
	"flexDirection",
	"justifyContent",
	"alignItems",
	"gridTemplateColumns",
	"gridTemplateRows",
	"gap",
	"textAlign",
	"textColor",
	"fontSize",
	"fontWeight",
	"backgroundColor",
	"padding",
	"paddingX",
	"paddingY",
	"paddingLeft",
	"paddingRight",
	"paddingTop",
	"paddingBottom",
	"margin",
	"marginX",
	"marginY",
	"marginLeft",
	"marginRight",
	"marginTop",
	"marginBottom",
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
const tailwindGroupName = [
	"size",
	"layout",
	"text",
	"style",
	"padding",
] as const;

export type TailwindGroupName = (typeof tailwindGroupName)[number];

export const schemaSizeGroup = z.object({
	width: z.string(),
	height: z.string(),
});

export type TailwindSizeGroup = z.infer<typeof schemaSizeGroup>;

const schemaLayoutBlockGroup = z.object({
	display: z.literal("block"),
});

const schemaLayoutFlexGroup = z.object({
	display: z.literal("flex"),
	flexDirection: z.string(),
	justifyContent: z.string(),
	alignItems: z.string(),
	gap: z.string(),
});

const schemaLayoutGridGroup = z.object({
	display: z.literal("grid"),
	gridTemplateColumns: z.string(),
	gridTemplateRows: z.string(),
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

export type TailwindLayoutGroup = z.infer<typeof schemaLayoutGroup>;

export const schemaTextGroup = z.object({
	textAlign: z.string(),
	textColor: z.string(),
	fontSize: z.string(),
	fontWeight: z.string(),
});

export type TailwindTextGroup = z.infer<typeof schemaTextGroup>;

export const schemaStyleGroup = z.object({
	backgroundColor: z.string(),
});

export type TailwindStyleGroup = z.infer<typeof schemaStyleGroup>;

export const schemaPaddingGroup = z.union([
	z.object({ padding: z.string() }),
	z.object({ paddingX: z.string(), paddingY: z.string() }),
	z.object({
		paddingLeft: z.string(),
		paddingRight: z.string(),
		paddingTop: z.string(),
		paddingBottom: z.string(),
	}),
]);

export type TailwindPaddingGroup = z.infer<typeof schemaPaddingGroup>;

export const tailwindClassNameGroupsSchema = z.object({
	size: schemaSizeGroup.optional(),
	layout: schemaLayoutGroup.optional(),
	text: schemaTextGroup.optional(),
	style: schemaStyleGroup.optional(),
	padding: schemaPaddingGroup.optional(),
});

export type TailwindClassNamesGroups = z.infer<
	typeof tailwindClassNameGroupsSchema
>;
