import { Label } from "@/components/ui-editor/label";
import { Input } from "@/components/ui-editor/input";
import { cn } from "@/lib/utils";

export function InputTool({
	label,
	value,
	onChange,
	isDisabled,
}: {
	label: string;
	value: string;
	onChange: (value: string) => void;
	isDisabled: boolean;
}) {
	return (
		<div className="flex flex-col items-start justify-stretch py-2 gap-3">
			<Label className={cn("font-semibold", isDisabled && "opacity-50")}>
				{label}
			</Label>

			<Input
				value={value}
				onChange={(e) => onChange(e.target.value)}
				disabled={isDisabled}
			/>
		</div>
	);
}
