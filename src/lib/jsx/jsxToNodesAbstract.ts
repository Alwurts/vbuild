import {
	type GenericComponentName,
	isValidComponentName,
} from "@/types/elements/elements";
import type { TNodeAbstract, TNodesAbstract } from "@/types/elements/jsx";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Registry } from "@/components/elements/Registry";
import type {
	TailwindClassNamesGroups,
	TailwindGroupName,
	TailwindStylePropertyName,
} from "@/types/tailwind/tailwind";
import { PROPERTIES_CLASSNAMES } from "../tailwindClasses";

const jsxNodesToNodesAbstract = (
	headReactNode: React.ReactNode,
): [TNodesAbstract, string] => {
	const newNodesAbstract: TNodesAbstract = {};

	const convertReactNodeToNodeAbstract = (
		reactNode: React.ReactNode,
		parentKey: string | null = null,
	): string | null => {
		const newkey = uuidv4();

		if (reactNode === null || reactNode === undefined) {
			return null;
		}

		if (
			typeof reactNode === "string" ||
			typeof reactNode === "number" ||
			typeof reactNode === "boolean"
		) {
			newNodesAbstract[newkey] = reactNode;
			return newkey;
		}

		if (!React.isValidElement(reactNode)) {
			throw new Error("Invalid react node");
		}

		const reactNodeClone = React.cloneElement(reactNode) as React.ReactElement;

		const typeName = (
			typeof reactNodeClone.type === "string"
				? reactNodeClone.type
				: "displayName" in reactNodeClone.type
					? reactNodeClone.type.displayName
					: reactNodeClone.type.name
		) as GenericComponentName;

		const { classNameGroupsdefaults } = Registry[typeName];

		const { children, className, ...props } = reactNodeClone.props;

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

			if (
				(groupName === "size" || groupName === "text") &&
				!Array.isArray(group)
			) {
				tailwindClassName[groupName] = processGroup(group, classNameSeparated);
			} else if (groupName === "layout") {
				const displayOptions = PROPERTIES_CLASSNAMES.display;
				const displayMatch =
					classNameSeparated.find((className) =>
						displayOptions.some(
							(displayClassName) => className === displayClassName,
						),
					) || "block";

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

		let childrenKeys: string[] = [];
		if ("children" in reactNodeClone.props && reactNodeClone.props.children) {
			const childrenReactNodes = Array.isArray(reactNodeClone.props.children)
				? reactNodeClone.props.children
				: [reactNodeClone.props.children];

			childrenKeys = childrenReactNodes
				.map((child: React.ReactNode) =>
					convertReactNodeToNodeAbstract(child, newkey),
				)
				.filter(
					(childKey: string | null): childKey is string => childKey !== null,
				);
		}

		if (!isValidComponentName(typeName)) {
			throw new Error(`Invalid type name: ${String(typeName)}`);
		}

		if (typeName === "Root") {
			const newNodeAbstract: TNodeAbstract = {
				key: newkey,
				props,
				type: typeName, // Get correct type
				children: childrenKeys,
				className: tailwindClassName,
			};

			newNodesAbstract[newkey] = newNodeAbstract;

			return newkey;
		}

		if (!parentKey) {
			throw new Error("Parent key is null and type is not Root");
		}

		const newNodeAbstract: TNodeAbstract = {
			key: newkey,
			parent: parentKey,
			props,
			type: typeName, // Get correct type
			children: childrenKeys,
			className: tailwindClassName,
		};

		newNodesAbstract[newkey] = newNodeAbstract;

		return newkey;
	};

	const headNodeAbstractKey = convertReactNodeToNodeAbstract(headReactNode);

	if (!headNodeAbstractKey) {
		throw new Error("Head node abstract key is null");
	}

	return [newNodesAbstract, headNodeAbstractKey];
};

export default jsxNodesToNodesAbstract;
