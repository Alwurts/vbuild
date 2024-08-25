import { cn } from "@/lib/utils";
import { Label } from "../ui-editor/label";

export function SettingLabelContainer({
	label,
	htmlFor,
	children,
	className,
}: {
	label: string;
	htmlFor: string;
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div className={cn("grid grid-cols-3 gap-2", className)}>
			<Label
				htmlFor={htmlFor}
				onClick={(e) => e.preventDefault()}
				title={label}
				className="truncate py-2"
			>
				{label}
			</Label>
			{children}
		</div>
	);
}
