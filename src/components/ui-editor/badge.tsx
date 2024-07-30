import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
	"inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring-editor focus:ring-offset-2",
	{
		variants: {
			variant: {
				default:
					"border-transparent bg-primary-editor text-primary-editor-foreground hover:bg-primary-editor/80",
				secondary:
					"border-transparent bg-secondary-editor text-secondary-editor-foreground hover:bg-secondary-editor/80",
				destructive:
					"border-transparent bg-destructive-editor text-destructive-editor-foreground hover:bg-destructive-editor/80",
				outline: "text-foreground-editor",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
	return (
		<div className={cn(badgeVariants({ variant }), className)} {...props} />
	);
}

export { Badge, badgeVariants };
