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
} from "@/types/tailwind/tailwind";

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

	const tailwindClassName: TailwindClassNamesGroups = {};

	const classNameSeparated = className
		? (className as string).trim().split(" ")
		: [];

	const processGroup = (
		group: TailwindClassNamesGroups[TailwindGroupName],
		classNameSeparated: string[],
	) => {
		if (!group) {
			return {};
		}
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const groupTemp: any = {};
		const entries = Object.entries(group);

		for (const [propertyKey, propertyValue] of entries) {
			const propertyName = propertyKey as TailwindStylePropertyName;
			const propertyListClassNames = PROPERTIES_CLASSNAMES[propertyName];
			const propertyMatch = classNameSeparated.find((className) =>
				propertyListClassNames.some(
					(propertyClassName) => className === propertyClassName,
				),
			);
			groupTemp[propertyName] = propertyMatch || propertyValue;
		}

		return groupTemp;
	};

	for (const [groupKey, group] of Object.entries(classNameGroupsdefaults)) {
		const groupName = groupKey as TailwindGroupName;

		if (!Array.isArray(group)) {
			tailwindClassName[groupName] = processGroup(group, classNameSeparated);
		} else if (groupName === "layout") {
			const displayOptions = PROPERTIES_CLASSNAMES.display;
			const displayMatch =
				classNameSeparated.find((className) =>
					displayOptions.some(
						(displayClassName) => className === displayClassName,
					),
				) ?? "block";

			const layoutGroup = classNameGroupsdefaults.layout?.find(
				(layout) => layout.display === displayMatch,
			);

			if (layoutGroup) {
				tailwindClassName[groupName] = processGroup(
					layoutGroup,
					classNameSeparated,
				);
			}
		}
	}

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
