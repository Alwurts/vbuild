import type React from "react";
import { useMemo } from "react";
import { useComposerStore } from "@/store/useComposerStore";
import { Separator } from "@/components/ui-editor/separator";
import { CircleSlash, Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";
import SizeGroup from "./SizeGroup";
import type { TGenericComponentsAbstract } from "@/types/elements/jsx";
import LayoutGroup from "./LayoutGroup";
import { Registry } from "@/components/elements/Registry";
import TextGroup from "./TextGroup";
import StyleGroup from "./StyleGroup";
import { ScrollArea } from "@/components/ui-editor/scroll-area";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui-editor/tabs";
import { CSSVariablesEditor } from "./CSSVariablesEditor";

export default function NodeEditor() {
	const nodes = useComposerStore((state) => state.nodes);
	const selectedNodeKey = useComposerStore((state) => state.selectedNode);

	const selectedNode = useMemo(
		() => (selectedNodeKey ? nodes[selectedNodeKey.nodeKey] : null),
		[selectedNodeKey, nodes],
	);

	return (
		<div className="border-l py-2 w-[250px] flex flex-col h-full space-y-2">
			<div className="px-4 flex items-center gap-2">
				<Settings2 className="w-4 h-4" />
				<h3 className="text-sm font-medium">Settings Panel</h3>
			</div>
			<Separator />
			<div className="flex-grow flex flex-col">
				<Tabs defaultValue="node-settings" className="flex flex-col flex-grow">
					<TabsList className="grid grid-cols-2 mx-2">
						<TabsTrigger value="node-settings">Node Settings</TabsTrigger>
						<TabsTrigger value="css-variables">CSS Variables</TabsTrigger>
					</TabsList>
					<TabsContent value="node-settings">
						{typeof selectedNode === "object" && (
							<NodeEditorContent nodeAbstract={selectedNode} />
						)}
					</TabsContent>
					<TabsContent value="css-variables">
						<CSSVariablesEditor />
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}

function NodeEditorContent({
	nodeAbstract,
}: {
	nodeAbstract: TGenericComponentsAbstract | null;
}) {
	if (!nodeAbstract) {
		return (
			<div className="flex flex-col items-center justify-center gap-2 py-10 text-muted-editor-foreground">
				<CircleSlash className="w-8 h-8" />
				<span>No node selected</span>
			</div>
		);
	}

	const { classNameGroupsdefaults } = Registry[nodeAbstract.type];

	return (
		<ScrollArea className="px-2 h-[calc(100vh-100px)]">
			{classNameGroupsdefaults.size && nodeAbstract.className.size && (
				<SizeGroup
					sizeGroup={nodeAbstract.className.size}
					nodeKey={nodeAbstract.key}
				/>
			)}
			{classNameGroupsdefaults.layout &&
				nodeAbstract.className.layout &&
				classNameGroupsdefaults.padding &&
				nodeAbstract.className.padding && (
					<LayoutGroup
						layoutGroup={nodeAbstract.className.layout}
						paddingGroup={nodeAbstract.className.padding}
						node={nodeAbstract}
					/>
				)}
			{classNameGroupsdefaults.text && nodeAbstract.className.text && (
				<TextGroup
					textGroup={nodeAbstract.className.text}
					nodeKey={nodeAbstract.key}
				/>
			)}
			{classNameGroupsdefaults.style && nodeAbstract.className.style && (
				<StyleGroup
					styleGroup={nodeAbstract.className.style}
					nodeKey={nodeAbstract.key}
				/>
			)}
		</ScrollArea>
	);
}
