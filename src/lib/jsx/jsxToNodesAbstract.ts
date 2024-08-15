import {
	type GenericComponentName,
	isValidComponentName,
} from "@/types/elements/elements";
import type { TNodeAbstract, TNodesAbstract } from "@/types/elements/jsx";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { TAILWIND_CLASS_NAME_REGEX, TAILWIND_GROUPS } from "./tailwind";
import { Registry } from "@/components/elements/Registry";
import type { TailwindClassName } from "@/types/elements/tailwind";

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

		const { children, ...props } = reactNodeClone.props;

		console.log("typeName", typeName);
		console.log("className", props.className);

		const tailwindClassName: TailwindClassName = {};
		if (props.className) {
			const classNameSeparated = (props.className as string).trim().split(" ");
			console.log("classNameSeparated", classNameSeparated);

			for (const group of componentClassNameGroups) {
				console.log("group", group);
				const groupTypes = TAILWIND_GROUPS[group];
				for (const type of groupTypes) {
					const regex = TAILWIND_CLASS_NAME_REGEX[type];
					const match = classNameSeparated.find((className) =>
						regex.test(className),
					);
					console.log("Match", match);
					if (match) {
						if (!tailwindClassName[group]) {
							tailwindClassName[group] = {};
						}
						if (tailwindClassName[group][type]) {
							throw new Error(`Duplicate tailwind class name: ${type}`);
						}
						tailwindClassName[group][type] = match;
					}
				}
			}
			console.log("tailwindClassName", tailwindClassName);
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
