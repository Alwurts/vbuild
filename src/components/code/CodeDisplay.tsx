import { useState } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/vs2015.css"; // Import a highlight.js theme
import { Button } from "@/components/ui/button";
import { CheckIcon, CopyIcon } from "lucide-react";
import type {
	ButtonVariantName,
	ButtonVariant,
	VariantStyleGroup,
	ButtonSizeName,
	SizeStyleGroup,
} from "@/types/style";
import { useStyleManagerStore } from "@/store/useStyleManagerStore";

interface CodeDisplayProps {
	code: string;
}

export function CodeDisplay() {
	const { variants, buttonText } = useStyleManagerStore();
	const [copied, setCopied] = useState(false);

	const getStyleClasses = ({
		type,
		name,
	}:
		| {
				type: "variant";
				name: ButtonVariantName;
		  }
		| {
				type: "size";
				name: ButtonSizeName;
		  }) => {
		if (type === "variant") {
			const style = variants[type].find((s) => s.styleName === name);
			if (!style) return "";
			const groupNames: VariantStyleGroup[] = [
				"text",
				"background",
				"border",
				"effects",
			];
			const groupsToBeApplied = [];
			for (const groupName of groupNames) {
				if (style[groupName].isApplied) {
					groupsToBeApplied.push(style[groupName].properties);
				}
			}
			return groupsToBeApplied
				.map((group) => Object.values(group).join(" "))
				.join(" ");
		}
		const style = variants[type].find((s) => s.styleName === name);
		if (!style) return "";
		const groupNames: SizeStyleGroup[] = ["size"];
		const groupsToBeApplied = [];
		for (const groupName of groupNames) {
			if (style[groupName].isApplied) {
				groupsToBeApplied.push(style[groupName].properties);
			}
		}
		return groupsToBeApplied
			.map((group) => Object.values(group).join(" "))
			.join(" ");
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
        default: "${getStyleClasses({ type: "variant", name: "default" })}",
        destructive: "${getStyleClasses({ type: "variant", name: "destructive" })}",
        outline: "${getStyleClasses({ type: "variant", name: "outline" })}",
        secondary: "${getStyleClasses({ type: "variant", name: "secondary" })}",
        ghost: "${getStyleClasses({ type: "variant", name: "ghost" })}",
        link: "${getStyleClasses({ type: "variant", name: "link" })}",
      },
      size: {
        default: "${getStyleClasses({ type: "size", name: "default" })}",
        sm: "${getStyleClasses({ type: "size", name: "sm" })}",
        lg: "${getStyleClasses({ type: "size", name: "lg" })}",
        icon: "${getStyleClasses({ type: "size", name: "icon" })}",
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
<Button variant="custom" size="custom">${buttonText}</Button>`;

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
