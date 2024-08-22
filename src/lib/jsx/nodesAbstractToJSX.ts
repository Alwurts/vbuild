import type { TNodesAbstract, TNodeAbstract } from "@/types/elements/jsx";
import type { GenericComponentName } from "@/types/elements/elements";
import { Registry } from "@/components/elements/Registry";
import { parseClassNameGroupsIntoString } from "../tailwind/tailwind";

function nodeAbstractToJSX(
	node: TNodeAbstract,
	nodes: TNodesAbstract,
	dependencies: Set<string>,
	indent = 0,
): string {
	const indentationString = " ".repeat(indent);
	if (typeof node !== "object") {
		return indentationString + String(node);
	}

	const { dependencies: componentDependencies } = Registry[node.type];

	const { type, props, children, className } = node;
	let componentName: string = type;

	switch (type) {
		case "Root":
			componentName = "main";
			break;
	}

	const propsString = Object.entries({
		...props,
		className: parseClassNameGroupsIntoString(className),
	})
		.map(([key, value]) => `${key}="${value}"`)
		.join(" ");

	const openTag = `<${componentName}${propsString ? ` ${propsString}` : ""}>`;
	const closeTag = `</${componentName}>`;

	if (!children || children.length === 0) {
		return indentationString + openTag + closeTag;
	}

	const childrenJSX = children
		.map((childKey) =>
			nodeAbstractToJSX(nodes[childKey], nodes, dependencies, indent + 2),
		)
		.join("\n");

	for (const dep of componentDependencies) {
		dependencies.add(dep);
	}

	return `${indentationString}${openTag}\n${childrenJSX}\n${indentationString}${closeTag}`;
}

export function nodesAbstractToJSX(
	nodesAbstract: TNodesAbstract,
	rootKey: string,
): string {
	const dependencies = new Set<string>();
	const jsxString = nodeAbstractToJSX(
		nodesAbstract[rootKey],
		nodesAbstract,
		dependencies,
		3,
	);

	const importStatements = Array.from(dependencies)
		.sort()
		.map((dep) => `import ${dep.split("/").pop()} from "${dep}";`)
		.join("\n");

	const customizedComponent = `function VBuildComponent() {
  return (
${jsxString}
  );
}
`;

	return `${importStatements}\n\n${customizedComponent}`;
}
