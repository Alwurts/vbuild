import type {
	TailwindClassNamesGroups,
	TailwindLayoutGroup,
} from "@/types/tailwind/tailwind";

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

export const defaultLayoutGroups: Record<
	TailwindLayoutGroup["display"],
	TailwindLayoutGroup
> = {
	block: {
		display: "block",
	},
	flex: {
		display: "flex",
		flexDirection: "flex-row",
		justifyContent: "justify-start",
		alignItems: "items-start",
		gap: "gap-0",
	},
	grid: {
		display: "grid",
		gridTemplateColumns: "grid-cols-1",
		gridTemplateRows: "grid-rows-1",
		gap: "gap-0",
	},
	hidden: {
		display: "hidden",
	},
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
