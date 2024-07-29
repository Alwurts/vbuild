import { useState } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/vs2015.css"; // Import a highlight.js theme
import { Button } from "@/components/ui/button";
import { CheckIcon, CopyIcon } from "lucide-react";
import type { ButtonStyleName, ButtonStyle } from "@/types/style";
import { useStyleManagerStore } from "@/store/useStyleManagerStore";

interface CodeDisplayProps {
	code: string;
}

export function CodeDisplay() {
	const { styles, text } = useStyleManagerStore();
	const [copied, setCopied] = useState(false);

	const buttonCode = `import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "${Object.entries(styles.default)
					.flatMap(([key, value]) =>
						value
							? Object.entries(value)
									.map(([subKey, subValue]) => subValue)
									.filter(Boolean)
							: [],
					)
					.join(" ")}",
        destructive: "${Object.entries(styles.destructive)
					.flatMap(([key, value]) =>
						value
							? Object.entries(value)
									.map(([subKey, subValue]) => subValue)
									.filter(Boolean)
							: [],
					)
					.join(" ")}",
        outline: "${Object.entries(styles.outline)
					.flatMap(([key, value]) =>
						value
							? Object.entries(value)
									.map(([subKey, subValue]) => subValue)
									.filter(Boolean)
							: [],
					)
					.join(" ")}",
        secondary: "${Object.entries(styles.secondary)
					.flatMap(([key, value]) =>
						value
							? Object.entries(value)
									.map(([subKey, subValue]) => subValue)
									.filter(Boolean)
							: [],
					)
					.join(" ")}",
        ghost: "${Object.entries(styles.ghost)
					.flatMap(([key, value]) =>
						value
							? Object.entries(value)
									.map(([subKey, subValue]) => subValue)
									.filter(Boolean)
							: [],
					)
					.join(" ")}",
        link: "${Object.entries(styles.link)
					.flatMap(([key, value]) =>
						value
							? Object.entries(value)
									.map(([subKey, subValue]) => subValue)
									.filter(Boolean)
							: [],
					)
					.join(" ")}",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
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
<Button variant="custom" size="custom">${text}</Button>`;

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
