import { useMemo, useState } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/vs2015.css"; // Import a highlight.js theme
import { Button } from "@/components/ui-editor/button";
import { CheckIcon, CopyIcon, EyeIcon } from "lucide-react";

import { Dialog, DialogContent, DialogTrigger } from "../ui-editor/dialog";
import { useComposerStore } from "@/store/useComposerStore";
import { nodesAbstractToJSX } from "@/lib/jsx/nodesAbstractToJSX";

export function CodeBlock({ button }: { button?: React.ReactNode }) {
  const { nodes, headNodeKey } = useComposerStore();
  const [copied, setCopied] = useState(false);
  const [open, setOnOpen] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const code = useMemo(() => {
    return nodesAbstractToJSX(nodes, headNodeKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
          <pre className="h-[70vh] w-[80vw] lg:w-[800px] p-4 overflow-auto bg-gray-900 text-white text-sm rounded-lg">
            <code
              // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
              dangerouslySetInnerHTML={{
                __html: hljs.highlight(code, { language: "tsx" }).value,
              }}
            />
          </pre>
        </div>
      </DialogContent>
    </Dialog>
  );
}
