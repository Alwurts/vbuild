import type { TGenericComponentRegistryEntry } from "@/types/elements/elements";
import {
	schemaLayoutGroup,
	schemaSizeGroup,
	type TailwindClassNamesGroups,
	type TailwindClassName,
	schemaTextGroup,
} from "@/types/tailwind/tailwind";

/* export const parseTailwindClassNameIntoGroups = (
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
	if (groupsToInclude.text) {
		const textGroup = schemaTextGroup.parse(className);
		parsedGroups.text = textGroup;
	}
	return parsedGroups;
}; */
