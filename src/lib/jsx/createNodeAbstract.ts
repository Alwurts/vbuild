import {
	type GenericComponentName,
	isValidComponentName,
} from "@/types/elements/elements";
import type { TNodeAbstract } from "@/types/elements/jsx";
import { Registry } from "@/components/elements/Registry";
import { PROPERTIES_CLASSNAMES } from "../tailwindClasses";
import type {
	TailwindClassNamesGroups,
	TailwindGroupName,
	TailwindStylePropertyName,
	TailwindPaddingGroup,
	TailwindLayoutGroup,
} from "@/types/tailwind/tailwind";
import { defaultLayoutGroups } from "@/lib/tailwind/tailwind";

export function createNodeAbstract(
	key: string,
	typeName: string,
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	props: any,
	childrenKeys: string[],
	className: string | undefined,
	parentKey: string | null = null,
): TNodeAbstract {
	if (!isValidComponentName(typeName)) {
		throw new Error(`Invalid type name: ${String(typeName)}`);
	}

	const { classNameGroupsdefaults } = Registry[typeName];
	const classNameSeparated = className ? className.trim().split(" ") : [];

	const tailwindClassName: TailwindClassNamesGroups = processGroups(
		classNameGroupsdefaults,
		classNameSeparated,
	);

	if (typeName === "Root") {
		return {
			key,
			props,
			type: typeName,
			children: childrenKeys,
			className: tailwindClassName,
		};
	}

	if (!parentKey) {
		throw new Error("Parent key is null and type is not Root");
	}

	return {
		key,
		parent: parentKey,
		props,
		type: typeName,
		children: childrenKeys,
		className: tailwindClassName,
	};
}

function processGroups(
	classNameGroupsdefaults: TailwindClassNamesGroups,
	classNameSeparated: string[],
): TailwindClassNamesGroups {
	const result: TailwindClassNamesGroups = {};

	for (const [groupKey, group] of Object.entries(classNameGroupsdefaults)) {
		const groupName = groupKey as TailwindGroupName;

		if (groupName === "layout") {
			result[groupName] = processLayoutGroup(
				group as TailwindLayoutGroup,
				classNameSeparated,
			);
		} else if (groupName === "padding") {
			result[groupName] = processPaddingGroup(
				group as TailwindPaddingGroup,
				classNameSeparated,
			);
		} else if (group) {
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			result[groupName] = processSimpleGroup(group, classNameSeparated) as any;
		}
	}

	return result;
}

function processLayoutGroup(
	layoutGroup: TailwindLayoutGroup,
	classNameSeparated: string[],
): TailwindLayoutGroup {
	const displayOptions = PROPERTIES_CLASSNAMES.display;
	const displayMatch =
		classNameSeparated.find((className) =>
			displayOptions.includes(className),
		) ?? layoutGroup.display;

	const defaultLayoutGroup =
		defaultLayoutGroups[displayMatch as keyof typeof defaultLayoutGroups];

	return processSimpleGroup(
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		{ ...defaultLayoutGroup, ...layoutGroup, display: displayMatch as any },
		classNameSeparated,
	) as TailwindLayoutGroup;
}

function processPaddingGroup(
	paddingGroup: TailwindPaddingGroup,
	classNameSeparated: string[],
): TailwindPaddingGroup {
	const paddingMatch = classNameSeparated.find((className) =>
		PROPERTIES_CLASSNAMES.padding.includes(className),
	);
	if (paddingMatch) return { padding: paddingMatch };

	const paddingXMatch = classNameSeparated.find((className) =>
		PROPERTIES_CLASSNAMES.paddingX.includes(className),
	);
	const paddingYMatch = classNameSeparated.find((className) =>
		PROPERTIES_CLASSNAMES.paddingY.includes(className),
	);
	if (paddingXMatch && paddingYMatch)
		return { paddingX: paddingXMatch, paddingY: paddingYMatch };

	const paddingLeftMatch = classNameSeparated.find((className) =>
		PROPERTIES_CLASSNAMES.paddingLeft.includes(className),
	);
	const paddingRightMatch = classNameSeparated.find((className) =>
		PROPERTIES_CLASSNAMES.paddingRight.includes(className),
	);
	const paddingTopMatch = classNameSeparated.find((className) =>
		PROPERTIES_CLASSNAMES.paddingTop.includes(className),
	);
	const paddingBottomMatch = classNameSeparated.find((className) =>
		PROPERTIES_CLASSNAMES.paddingBottom.includes(className),
	);
	if (
		paddingLeftMatch &&
		paddingRightMatch &&
		paddingTopMatch &&
		paddingBottomMatch
	) {
		return {
			paddingLeft: paddingLeftMatch,
			paddingRight: paddingRightMatch,
			paddingTop: paddingTopMatch,
			paddingBottom: paddingBottomMatch,
		};
	}

	return processSimpleGroup(
		paddingGroup,
		classNameSeparated,
	) as TailwindPaddingGroup;
}

function processSimpleGroup(
	group: TailwindClassNamesGroups[TailwindGroupName],
	classNameSeparated: string[],
): TailwindClassNamesGroups[TailwindGroupName] {
	if (!group) return {} as TailwindClassNamesGroups[TailwindGroupName];

	const result: Record<string, string> = {};
	const entries = Object.entries(group);

	for (const [propertyKey, propertyValue] of entries) {
		const propertyName = propertyKey as TailwindStylePropertyName;
		const propertyListClassNames = PROPERTIES_CLASSNAMES[propertyName];
		const propertyMatch = classNameSeparated.find((className) =>
			propertyListClassNames.includes(className),
		);
		result[propertyName] = propertyMatch || propertyValue;
	}

	return result as TailwindClassNamesGroups[TailwindGroupName];
}
