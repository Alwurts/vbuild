import { useState } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/vs2015.css"; // Import a highlight.js theme
import { Button } from "@/components/ui-editor/button";
import { CheckIcon, CopyIcon, EyeIcon } from "lucide-react";

import { useStyleManagerStore } from "@/store/useStyleManagerStore";
import { Dialog, DialogContent, DialogTrigger } from "../ui-editor/dialog";

export function CodeDisplay() {
	const { styles, componentText, currentComponent } = useStyleManagerStore();
	const [copied, setCopied] = useState(false);

	const getStyleClasses = ({
		type,
		name,
	}: {
		type: "variant" | "size";
		name: string;
	}) => {
		// @ts-ignore
		const style = styles[currentComponent][type][name];
		if (!style) return "";

		const groupNames = Object.keys(style) as (keyof typeof style)[];
		const groupsToBeApplied = groupNames
			.filter((groupName) => style[groupName].isApplied)
			.map((groupName) => Object.values(style[groupName].properties).join(" "));

		return groupsToBeApplied.join(" ");
	};

	const generateComponentCode = () => {
		if (currentComponent === "button") {
			return `import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        ${Object.keys(styles.button.variant)
					.map(
						(variantName) =>
							`${variantName}: "${getStyleClasses({ type: "variant", name: variantName })}"`,
					)
					.join(",\n        ")},
      },
      size: {
        ${Object.keys(styles.button.size ?? {})
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
		}

		if (currentComponent === "badge") {
			return `import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        ${Object.keys(styles.badge.variant)
					.map(
						(variantName) =>
							`${variantName}: "${getStyleClasses({ type: "variant", name: variantName })}"`,
					)
					.join(",\n        ")},
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

// Usage:
<Badge variant="custom">${componentText}</Badge>`;
		}

		if (currentComponent === "card") {
			return `import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "${getStyleClasses({ type: "variant", name: "default" })}",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))	
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

// Usage:
<Card>
  <CardHeader>
    <CardTitle>${componentText}</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>`;
		}
	};

	const componentCode = generateComponentCode();

	const copyToClipboard = () => {
		navigator.clipboard.writeText(componentCode ?? "");
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
					View Code
					<EyeIcon className="w-4 h-4" />
				</Button>
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
								__html: hljs.highlight(componentCode ?? "", { language: "tsx" })
									.value,
							}}
						/>
					</pre>
				</div>
			</DialogContent>
		</Dialog>
	);
}
