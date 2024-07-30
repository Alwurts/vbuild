import { useState } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/vs2015.css"; // Import a highlight.js theme
import { Button } from "@/components/ui/button";
import { CheckIcon, CopyIcon } from "lucide-react";

import { useStyleManagerStore } from "@/store/useStyleManagerStore";
import { ButtonSizeName, ButtonVariantName } from "@/types/button";

export function CodeDisplay() {
	const { styles, componentText } = useStyleManagerStore();
	const [copied, setCopied] = useState(false);

	const getStyleClasses = ({
		type,
		name,
	}: {
		type: "variant" | "size";
		name: string;
	}) => {
		// @ts-ignore
		const style = styles[type][name];
		if (!style) return "";

		const groupNames = Object.keys(style) as (keyof typeof style)[];
		const groupsToBeApplied = groupNames
			.filter((groupName) => style[groupName].isApplied)
			.map((groupName) => Object.values(style[groupName].properties).join(" "));

		return groupsToBeApplied.join(" ");
	};

	const buttonCode = `import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        ${Object.keys(styles.variant)
					.map(
						(variantName) =>
							`${variantName}: "${getStyleClasses({ type: "variant", name: variantName })}"`,
					)
					.join(",\n        ")},
      },
      size: {
        ${Object.keys(styles.size)
					.map(
						(sizeName) =>
							`${sizeName}: "${getStyleClasses({ type: "size", name: sizeName })}"`,
					)
					.join(",\n        ")},
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

// Usage:
<Button variant="custom" size="custom">${componentText}</Button>`;

	const copyToClipboard = () => {
		navigator.clipboard.writeText(buttonCode);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between px-2">
				Read-only code display
				<Button variant="outline" onClick={copyToClipboard}>
					{copied ? (
						<CheckIcon className="w-4 h-4 mr-2" />
					) : (
						<CopyIcon className="w-4 h-4 mr-2" />
					)}
					Copy
				</Button>
			</div>
			<div className="relative">
				<pre className="p-4 rounded-md overflow-x-auto bg-gray-900 text-white">
					<code
						// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
						dangerouslySetInnerHTML={{
							__html: hljs.highlight(buttonCode, { language: "tsx" }).value,
						}}
					/>
				</pre>
			</div>
		</div>
	);
}
