"use client";

import type React from "react";
import { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui-editor/button";
import { Card } from "@/components/ui-editor/card";
import { Input } from "@/components/ui-editor/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui-editor/select";
import { Separator } from "@/components/ui-editor/separator";
import { TreeView } from "../../components/element-composer/Explorer";
import type {
  TElementComponent,
  TReactElementRoot,
  TReactNode,
} from "@/types/jsx";
import { REACT_ELEMENT_ROOT_DEFAULT, renderReactNode } from "@/lib/jsx";

const Canvas = ({ jsxTree }: { jsxTree: TReactElementRoot }) => {
  const renderJSXTree = (tree: TReactNode): React.ReactNode => {
    if (tree === null) {
      return null;
    }

    if (typeof tree !== "object") {
      return renderReactNode(tree, null);
    }

    let children: React.ReactNode = null;
    if (tree.props.children) {
      if (Array.isArray(tree.props.children)) {
        children = tree.props.children.map((child) => renderJSXTree(child));
      } else if (typeof tree.props.children === "object") {
        children = renderJSXTree(tree.props.children);
      } else {
        children = renderJSXTree(tree.props.children);
      }
    }

    /* const children = tree.props.children
      ? Array.isArray(tree.props.children)
        ? tree.props.children.map((child, index) =>
            renderJSXTree(child, [...path, "children", index])
          )
        : renderJSXTree(tree.props.children, [...path, "children"])
      : null; */
    const renderedNode = renderReactNode(tree, children);

    return renderedNode;
  };

  /* const renderJSXTree = (
		tree: TReactTree,
		path: (string | number)[] = [],
	): React.ReactNode => {
		if (typeof tree !== "object" || tree === null) {
			return String(tree);
		}

		const { type, props } = tree as TReactElement;
		const isSelected = path.join(".") === selectedPath.join(".");
		const commonProps = {
			onClick: (e: React.MouseEvent) => {
				e.stopPropagation();
				setSelectedPath(path);
			},
			className: props.className,
		};

		const children = props.children
			? Array.isArray(props.children)
				? props.children.map((child, index) =>
						renderJSXTree(child, [...path, "children", index]),
					)
				: renderJSXTree(props.children, [...path, "children"])
			: null;

		switch (type) {
			case "Button":
				return (
					<Button key={path.join(".")} {...commonProps}>
						{children}
					</Button>
				);
			case "Input":
				return <Input key={path.join(".")} {...commonProps} />;
			case "p":
				return (
					<p key={path.join(".")} {...commonProps}>
						{children}
					</p>
				);
			case "h1":
				return (
					<h1 key={path.join(".")} {...commonProps}>
						{children}
					</h1>
				);
			case "h2":
				return (
					<h2 key={path.join(".")} {...commonProps}>
						{children}
					</h2>
				);
			case "h3":
				return (
					<h3 key={path.join(".")} {...commonProps}>
						{children}
					</h3>
				);
			default:
				return (
					<div key={path.join(".")} {...commonProps}>
						{children}
					</div>
				);
		}
	}; */

  return (
    <div className="bg-red-400 h-screen w-full">{renderJSXTree(jsxTree)}</div>
  );
};

export default function Editor() {
  const [jsxTree, setJsxTree] = useState<TReactElementRoot>(
    REACT_ELEMENT_ROOT_DEFAULT
  );

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex w-screen h-screen">
      <TreeView tree={jsxTree} />
      <Canvas jsxTree={jsxTree} />
    </div>
  );
}
