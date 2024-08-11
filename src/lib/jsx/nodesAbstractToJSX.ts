import type { TNodesAbstract, TNodeAbstract } from "@/types/elements/jsx";
import type { GenericComponentName } from "@/types/elements/elements";
/* import prettier from "prettier";
import parserBabel from "prettier/parser-babel"; */

function nodeAbstractToJSX(
	node: TNodeAbstract,
	nodes: TNodesAbstract,
	indent = 0,
): string {
	if (typeof node !== "object") {
		return " ".repeat(indent) + String(node);
	}

	const { type, props, children } = node;
	const componentName = type as GenericComponentName;

	const propsString = Object.entries(props)
		.map(([key, value]) => `${key}="${value}"`)
		.join(" ");

	const openTag = `<${componentName}${propsString ? ` ${propsString}` : ""}>`;
	const closeTag = `</${componentName}>`;

	if (!children || children.length === 0) {
		return " ".repeat(indent) + openTag + closeTag;
	}

	const childrenJSX = children
		.map((childKey) => nodeAbstractToJSX(nodes[childKey], nodes, indent + 2))
		.join("\n");

	return `${" ".repeat(indent)}${openTag}\n${childrenJSX}\n${" ".repeat(indent)}${closeTag}`;
}

export function nodesAbstractToJSX(
	nodesAbstract: TNodesAbstract,
	rootKey: string,
): string {
	const jsxString = nodeAbstractToJSX(nodesAbstract[rootKey], nodesAbstract);

	// Format the JSX string using Prettier
	/* const formattedJSX = prettier.format(jsxString, {
		parser: "babel",
		plugins: [parserBabel],
		semi: false,
		singleQuote: true,
	}); */

	return jsxString;
}
