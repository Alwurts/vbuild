import { cn } from "@/lib/utils";

export const DivFlex = ({
	children,
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn("flex", className)}
		{...props}
	>
		{children}
	</div>
);
