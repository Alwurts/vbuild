import { Label } from "@/components/ui/label";
import { Input } from "./ui/input";

export function InputTool({
	label,
	value,
	onChange,
}: {
	label: string;
	value: string;
	onChange: (value: string) => void;
}) {
	return (
		<div className="flex flex-col items-start justify-stretch py-2 gap-3">
			<Label className="font-semibold">{label}</Label>

			<Input value={value} onChange={(e) => onChange(e.target.value)} />
		</div>
	);
}
