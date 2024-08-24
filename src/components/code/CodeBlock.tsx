import { useMemo, useState } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/vs2015.css";
import { Button } from "@/components/ui-editor/button";
import { CheckIcon, CopyIcon, EyeIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "../ui-editor/dialog";
import { useComposerStore } from "@/store/useComposerStore";
import { nodesAbstractToJSX } from "@/lib/jsx/nodesAbstractToJSX";
import { cssVariablesToCode } from "@/lib/cssVariablesToCode";
import { useShallow } from "zustand/react/shallow";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui-editor/tabs";

function CodeContent() {
	const { nodes, headNodeKey, cssVariables } = useComposerStore(
		useShallow((state) => ({
			nodes: state.nodes,
			headNodeKey: state.headNodeKey,
			cssVariables: state.cssVariables,
		})),
	);
	const [copied, setCopied] = useState(false);
	const [activeTab, setActiveTab] = useState<"component" | "css">("component");

	const componentCode = useMemo(() => {
		return nodesAbstractToJSX(nodes, headNodeKey);
	}, [nodes, headNodeKey]);

	const cssCode = useMemo(() => {
		return cssVariablesToCode(cssVariables);
	}, [cssVariables]);

	const copyToClipboard = () => {
		const codeToCopy = activeTab === "component" ? componentCode : cssCode;
		navigator.clipboard.writeText(codeToCopy);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="flex flex-col h-full gap-2">
			<div className="flex-shrink-0 flex items-center justify-between px-2 py-2">
				<span className="text-sm font-medium">Read-only code display</span>
				<Button
					variant="outline"
					size="sm"
					className="mr-3"
					onClick={copyToClipboard}
				>
					{copied ? (
						<CheckIcon className="w-4 h-4 mr-2" />
					) : (
						<CopyIcon className="w-4 h-4 mr-2" />
					)}
					Copy
				</Button>
			</div>
			<Tabs
				value={activeTab}
				onValueChange={(value) => setActiveTab(value as "component" | "css")}
			>
				<TabsList>
					<TabsTrigger value="component">Component</TabsTrigger>
					<TabsTrigger value="css">CSS Variables</TabsTrigger>
				</TabsList>
				<TabsContent value="component">
					<pre className="h-[70vh] w-[80vw] lg:w-[800px] p-4 overflow-auto bg-gray-900 text-white text-sm rounded-lg">
						<code
							// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
							dangerouslySetInnerHTML={{
								__html: hljs.highlight(componentCode, { language: "tsx" })
									.value,
							}}
						/>
					</pre>
				</TabsContent>
				<TabsContent value="css">
					<pre className="h-[70vh] w-[80vw] lg:w-[800px] p-4 overflow-auto bg-gray-900 text-white text-sm rounded-lg">
						<code
							// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
							dangerouslySetInnerHTML={{
								__html: hljs.highlight(cssCode, { language: "css" }).value,
							}}
						/>
					</pre>
				</TabsContent>
			</Tabs>
		</div>
	);
}

export function CodeBlock({ button }: { button?: React.ReactNode }) {
	const [open, setOnOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOnOpen}>
			<DialogTrigger asChild>
				{button ?? (
					<Button
						variant="outline"
						size="sm"
						className="flex items-center gap-x-2 self-end mr-4"
					>
						View Code
						<EyeIcon className="w-4 h-4" />
					</Button>
				)}
			</DialogTrigger>
			<DialogContent className="max-w-fit">
				{open && <CodeContent />}
			</DialogContent>
		</Dialog>
	);
}
