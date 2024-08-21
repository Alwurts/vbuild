import type { TGenericComponentRegistryEntry } from "@/types/elements/elements";
import {
	schemaLayoutGroup,
	schemaSizeGroup,
	type TailwindClassNamesGroups,
	type TailwindClassName,
	type TailwindClassNameRegex,
	type TailwindGroupName,
} from "@/types/tailwind/tailwind";

export const TAILWIND_REGEX: TailwindClassNameRegex = {
	width: /^w-/,
	height: /^h-/,
	padding: /^p-/,
	margin: /^m-/,
	display:
		/^(block|inline|inline-block|flex|inline-flex|grid|inline-grid|contents|hidden)$/,
	flexDirection: /^(flex-row|flex-col|flex-row-reverse|flex-col-reverse)$/,
	justifyContent:
		/^(justify-normal|justify-start|justify-end|justify-center|justify-between|justify-around|justify-evenly|justify-stretch)$/,
	alignItems:
		/^(items-start|items-end|items-center|items-baseline|items-stretch)$/,
	gridTemplateColumns:
		/^(grid-cols-none|grid-cols-1|grid-cols-2|grid-cols-3|grid-cols-4|grid-cols-5|grid-cols-6|grid-cols-7|grid-cols-8|grid-cols-9|grid-cols-10|grid-cols-11|grid-cols-12)$/,
	gridTemplateRows:
		/^(grid-rows-none|grid-rows-1|grid-rows-2|grid-rows-3|grid-rows-4|grid-rows-5|grid-rows-6|grid-rows-7|grid-rows-8|grid-rows-9|grid-rows-10|grid-rows-11|grid-rows-12)$/,
	gap: /^gap-/,
} as const;

export const parseTailwindClassNameIntoGroups = (
	className: TailwindClassName,
	groupsToInclude: TGenericComponentRegistryEntry["classNameGroups"],
) => {
	const parsedGroups: TailwindClassNamesGroups = {};
	if (groupsToInclude.size) {
		const sizeGroup = schemaSizeGroup.parse(className);
		parsedGroups.size = sizeGroup;
	}
	if (groupsToInclude.layout) {
		const layoutGroup = schemaLayoutGroup.parse(className);
		parsedGroups.layout = layoutGroup;
	}
	return parsedGroups;
};
