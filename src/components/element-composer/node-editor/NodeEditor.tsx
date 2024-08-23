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
import { PaddingControl } from "@/components/settings-tools/padding-control";

export default function NodeEditor() {
	const nodes = useComposerStore((state) => state.nodes);
	const selectedNodeKey = useComposerStore((state) => state.selectedNode);

	const selectedNode = useMemo(
		() => (selectedNodeKey ? nodes[selectedNodeKey.nodeKey] : null),
		[selectedNodeKey, nodes],
	);

	if (!selectedNode || typeof selectedNode !== "object") {
		return (
			<Layout className="text-muted-editor-foreground">
				<div className="flex flex-col items-center justify-center gap-2 py-10">
					<CircleSlash className="w-8 h-8" />
					<span>No node selected</span>
				</div>
			</Layout>
		);
	}

	return <NodeEditorContent nodeAbstract={selectedNode} />;
}

const Layout = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<div className="border-l p-2 w-[250px] flex flex-col items-stretch justify-start">
			<div className="px-2 pb-2 pt-1 flex items-center gap-2">
				<Settings2 className="w-4 h-4" />
				<h3 className="text-sm font-medium">Settings Panel</h3>
			</div>
			<Separator />
			<ScrollArea
				className={cn(
					"flex-1 flex flex-col items-stretch justify-start",
					className,
				)}
			>
				{children}
			</ScrollArea>
		</div>
	);
};

function NodeEditorContent({
	nodeAbstract,
}: {
	nodeAbstract: TGenericComponentsAbstract;
}) {
	const { classNameGroupsdefaults } = Registry[nodeAbstract.type];

	return (
		<Layout>
			{classNameGroupsdefaults.size && nodeAbstract.className.size && (
				<SizeGroup
					sizeGroup={nodeAbstract.className.size}
					nodeKey={nodeAbstract.key}
				/>
			)}
			{classNameGroupsdefaults.layout && nodeAbstract.className.layout && (
				<LayoutGroup
					layoutGroup={nodeAbstract.className.layout}
					node={nodeAbstract}
				/>
			)}
			{classNameGroupsdefaults.padding && nodeAbstract.className.padding && (
				<PaddingControl
					value={nodeAbstract.className.padding}
					nodeKey={nodeAbstract.key}
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
		</Layout>
	);
}
