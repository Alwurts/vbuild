import {
	type GenericComponentName,
	isValidComponentName,
} from "@/types/elements/elements";
import type { TNodeAbstract, TNodesAbstract } from "@/types/elements/jsx";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Registry } from "@/components/elements/Registry";
import type {
	TailwindClassName,
	TailwindStylePropertyName,
} from "@/types/tailwind/tailwind";
import { parseTailwindClassNameIntoGroups, TAILWIND_REGEX } from "../tailwind/tailwind";

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

		const { defaultClassNameProperties, classNameGroups } = Registry[typeName];

		const { children, className, ...props } = reactNodeClone.props;

		const tailwindClassName: TailwindClassName = {};

		const classNameSeparated = className
			? (className as string).trim().split(" ")
			: [];
		for (const [property, value] of Object.entries(
			defaultClassNameProperties,
		)) {
			const propertyName = property as TailwindStylePropertyName;
			const propertyRegex = TAILWIND_REGEX[propertyName];
			const propertyMatch = classNameSeparated.find((className) =>
				propertyRegex.test(className),
			);
			if (propertyMatch) {
				// A class was found on the parsed code
				tailwindClassName[propertyName] = propertyMatch;
			} else {
				// A class was not found on the parsed code lets use the component default value
				tailwindClassName[propertyName] = value;
			}
		}

		const parsedGroups = parseTailwindClassNameIntoGroups(
      tailwindClassName,
      classNameGroups
    );

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
				className: parsedGroups,
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
			className: parsedGroups,
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
