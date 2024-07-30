import { useState } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/vs2015.css";
import { Button } from "@/components/ui-editor/button";
import { CheckIcon, CopyIcon, EyeIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "../ui-editor/dialog";
import { useStyleManagerStore } from "@/store/useStyleManagerStore";

export function CSSVariablesDisplay() {
	const { cssVariables } = useStyleManagerStore();
	const [copied, setCopied] = useState(false);

	const generateCSSVariablesCode = () => {
		const lightModeVars = Object.entries(cssVariables ?? {})
			.map(([name, value]) => `  --${name}: ${value};`)
			.join("\n");

		const darkModeVars = Object.entries(cssVariables ?? {})
			.map(([name, value]) => `  --${name}: ${value};`)
			.join("\n");

		return `:root {
${lightModeVars}
}

.dark {
${darkModeVars}
}`;
	};

	const cssVariablesCode = generateCSSVariablesCode();

	const copyToClipboard = () => {
		navigator.clipboard.writeText(cssVariablesCode);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					className="flex items-center gap-x-2 self-end mr-4"
				>
					View CSS Variables
					<EyeIcon className="w-4 h-4" />
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-fit">
				<div className="flex flex-col h-full gap-2">
					<div className="flex-shrink-0 flex items-center justify-between px-2 py-2">
						<span className="text-sm font-medium">CSS Variables</span>
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
					<pre className="h-[70vh] w-[800px] p-4 overflow-auto bg-gray-900 text-white text-sm rounded-lg">
						<code
							// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
							dangerouslySetInnerHTML={{
								__html: hljs.highlight(cssVariablesCode, { language: "css" })
									.value,
							}}
						/>
					</pre>
				</div>
			</DialogContent>
		</Dialog>
	);
}
