import { renderReactNode } from "@/components/elements/RenderNode";
import type { TNodeAbstract, TNodesAbstract, TNodeTree } from "@/types/jsx";
import React from "react";

import { v4 as uuidv4 } from "uuid";


function tsStructureToJsxString(nodes: TNodesAbstract, rootKey: string, indentLevel: number = 0): string {
  const node = nodes[rootKey];
  if (typeof node !== 'object') {
    return String(node);
  }

  const indent = '  '.repeat(indentLevel);
  const childIndent = '  '.repeat(indentLevel + 1);

  let jsxString = `${indent}<${node.type}`;

  // Add props
  for (const [key, value] of Object.entries(node.props)) {
    if (typeof value === 'string') {
      jsxString += ` ${key}="${value}"`;
    } else {
      jsxString += ` ${key}={${JSON.stringify(value)}}`;
    }
  }

  if (!node.children || node.children.length === 0) {
    return `${jsxString} />`;
  }

  jsxString += '>\n';

  // Process children
  for (const childKey of node.children) {
    jsxString += tsStructureToJsxString(nodes, childKey, indentLevel + 1);
    jsxString += '\n';
  }

  jsxString += `${indent}</${node.type}>`;

  return jsxString;
}

function formatJsxCode(jsxString: string): string {
  // This is a simple formatter. For more complex formatting,
  // you might want to use a library like Prettier.
  const lines = jsxString.split('\n');
  let indentLevel = 0;
  const formattedLines = lines.map(line => {
    line = line.trim();
    if (line.startsWith('</')) {
      indentLevel--;
    }
    const formattedLine = '  '.repeat(indentLevel) + line;
    if (!line.endsWith('/>') && !line.startsWith('</')) {
      indentLevel++;
    }
    return formattedLine;
  });
  return formattedLines.join('\n');
}

// Example usage:
const tsStructure = {
  // ... your TNodesAbstract structure here
};

const rootKey = Object.keys(tsStructure).find(key => tsStructure[key].type === 'Root')!;
const jsxString = tsStructureToJsxString(tsStructure, rootKey);
const formattedJsxCode = formatJsxCode(jsxString);

function jsxToTsStructure(jsx: JSX.Element): TNodesAbstract {
  const nodes: TNodesAbstract = {};
  const rootKey = uuidv4();

  function processElement(element: JSX.Element, parentKey: string): string {
    const key = uuidv4();
    const type = element.type.name;
    const props = { ...element.props };
    delete props.children;

    const node: TNodeAbstract = {
      type,
      key,
      parent: parentKey,
      props,
      children: null,
    };

    if (React.Children.count(element.props.children) > 0) {
      node.children = [];
      React.Children.forEach(element.props.children, (child) => {
        if (React.isValidElement(child)) {
          const childKey = processElement(child, key);
          node.children!.push(childKey);
        } else if (typeof child === 'string' || typeof child === 'number' || typeof child === 'boolean') {
          const childKey = uuidv4();
          nodes[childKey] = child;
          node.children!.push(childKey);
        }
      });
    }

    nodes[key] = node;
    return key;
  }

  const rootNode: TNodeAbstract = {
    type: 'Root',
    key: rootKey,
    props: {},
    children: [processElement(jsx, rootKey)],
  };

  nodes[rootKey] = rootNode;
  return nodes;
}

const tsStructure = jsxToTsStructure(jsxElement);

export const addComponent = (
	nodesAbstract: TNodesAbstract,
	newParentKey: string,
	newComponent: TNodeAbstract,
): [TNodesAbstract, string] => {
	const newComponentKey = uuidv4();
	const newComponentParent = nodesAbstract[newParentKey];

	if (typeof newComponentParent !== "object") {
		throw new Error("New component parent must be an object");
	}

	if (typeof newComponent !== "object") {
		return [
			{
				...nodesAbstract,
				[newParentKey]: {
					...newComponentParent,
					children: [...(newComponentParent.children || []), newComponentKey],
				},
				[newComponentKey]: newComponent,
			},
			newComponentKey,
		];
	}

	if (newComponent.type === "Root") {
		throw new Error("New component must not be a Root");
	}

	return [
		{
			...nodesAbstract,
			[newParentKey]: {
				...newComponentParent,
				children: [...(newComponentParent.children || []), newComponentKey],
			},
			[newComponentKey]: {
				...newComponent,
				key: newComponentKey,
				parent: newParentKey,
			},
		},
		newComponentKey,
	];
};

export const rootUuid = uuidv4();

const ROOT_COMPONENT_ABSTRACT_DEFAULT: TNodesAbstract = {
	[rootUuid]: {
		type: "Root",
		key: rootUuid,
		props: {},
		children: [],
	},
};

const [rootWithFlex, divFlexUuid] = addComponent(
	ROOT_COMPONENT_ABSTRACT_DEFAULT,
	rootUuid,
	{
		type: "DivFlex",
		key: "",
		parent: "",
		children: null,
		props: {
			className: "w-full bg-red-500",
		},
	},
);

export const [rootWithFlex2, divFlex2Uuid] = addComponent(
	rootWithFlex,
	divFlexUuid,
	{
		type: "DivFlex",
		key: "",
		parent: "",
		children: null,
		props: {
			className: "w-40 h-40 bg-blue-500",
		},
	},
);

export const ROOT_COMPONENT_TREE_AND_REACT_DEFAULT =
	nodesAbstractToTreeAndReact(rootWithFlex2, rootUuid);

export function nodesAbstractToTreeAndReact(
	nodesAbstract: TNodesAbstract,
	headNodeKey: string,
): { tree: TNodeTree; react: React.ReactNode } {
	const headNodeAbstract = nodesAbstract[headNodeKey];

	if (
		typeof headNodeAbstract !== "object" ||
		headNodeAbstract.type !== "Root"
	) {
		throw new Error("Head node must be Root");
	}

	const constructTree = (
		nodeAbstractKey: string,
	): { tree: TNodeTree; react: React.ReactNode } => {
		const nodeAbstract = nodesAbstract[nodeAbstractKey];

		if (typeof nodeAbstract !== "object") {
			return { tree: nodeAbstract, react: renderReactNode(nodeAbstract, null) };
		}

		const childrenTreeAndReact = nodeAbstract.children
			? nodeAbstract.children.map((child) => constructTree(child))
			: null;

		const childrenTree = childrenTreeAndReact
			? childrenTreeAndReact.map((child) => child.tree)
			: null;
		const childrenReactNode = childrenTreeAndReact
			? childrenTreeAndReact.map((child) => child.react)
			: null;

		return {
			tree: {
				...nodeAbstract,
				children: childrenTree,
			},
			react: renderReactNode(nodeAbstract, childrenReactNode),
		};
	};

	const tree = constructTree(headNodeAbstract.key);

	return tree;
}

export { ROOT_COMPONENT_ABSTRACT_DEFAULT as ROOT_COMPONENT_DEFAULT };
