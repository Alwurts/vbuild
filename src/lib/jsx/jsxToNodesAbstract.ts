import {
	type GenericComponentName,
	isValidComponentName,
} from "@/types/elements/elements";
import type { TNodeAbstract, TNodesAbstract } from "@/types/elements/jsx";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { TAILWIND_CLASS_NAME_REGEX, TAILWIND_GROUPS } from "./tailwind";
import { Registry } from "@/components/elements/Registry";
import type {
	TailwindClassName,
	TailwindGroupName,
	TailwindType,
} from "@/types/elements/tailwind";

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

		const { classNameGroups: componentClassNameGroups } = Registry[typeName];

		const { children, className, ...props } = reactNodeClone.props;

		const tailwindClassName: TailwindClassName = {};

		const classNameSeparated = className ? (className as string).trim().split(" ") : [];
		for (const [group, groupTypes] of Object.entries(
			componentClassNameGroups,
		)) {
			const groupName = group as TailwindGroupName;
			for (const [type, typeValue] of Object.entries(groupTypes)) {
				const typeName = type as TailwindType;
				const regex = TAILWIND_CLASS_NAME_REGEX[typeName];
				const match = classNameSeparated.find((className) =>
					regex.test(className),
				);
				if (!tailwindClassName[groupName]) {
					tailwindClassName[groupName] = {};
				}
				if (tailwindClassName[groupName][typeName]) {
					throw new Error(`Duplicate tailwind class name: ${typeName}`);
				}
				if (match) {
					tailwindClassName[groupName][typeName] = match;
				} else {
					tailwindClassName[groupName][typeName] = typeValue;
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
