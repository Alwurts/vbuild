import type { TNodeAbstract } from "@/types/elements/jsx";

export const checkIfDraggable = (node: TNodeAbstract) =>
	typeof node === "object" && node.type !== "Root";

export const checkIfDroppable = (node: TNodeAbstract) =>
	typeof node === "object" &&
	(node.type === "Div" ||
		node.type === "Root" ||
		node.type === "Card" ||
		node.type === "CardContent" ||
		node.type === "CardFooter" ||
		node.type === "CardHeader");

export const checkIfContentEditable = (node: TNodeAbstract) =>
	typeof node === "object" &&
	(node.type === "Button" ||
		node.type === "CardTitle" ||
		node.type === "CardDescription");
