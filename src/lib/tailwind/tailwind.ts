import type { TailwindClassNamesGroups } from "@/types/tailwind/tailwind";

export const parseClassNameGroupsIntoString = (
	className: TailwindClassNamesGroups,
) => {
	let classNameString = "";
	for (const group of Object.values(className)) {
		for (const propertyValue of Object.values(group)) {
			classNameString += `${propertyValue} `;
		}
	}
	return classNameString;
};

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
