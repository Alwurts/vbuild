import { cn } from "@/lib/utils";

export const Root = ({
	children,
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn(className)}
		{...props}
	>
		{children}
	</div>
);
