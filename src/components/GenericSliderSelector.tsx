import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";

export function GenericSliderSelector({
	label,
	value,
	onChange,
	options,
	width = "w-16",
}: {
	label: string;
	value: string;
	onChange: (value: string) => void;
	options: string[];
	width?: string;
}) {
	return (
		<div className="flex flex-col items-start justify-stretch py-2 gap-3">
			<Label className="font-semibold">{label}</Label>
			<div className="flex justify-start items-stretch w-full gap-2 border border-input rounded-md px-4 py-2 h-9">
				<span
					className={cn(
						"text-sm font-medium shrink-0 flex flex-col items-start gap-1",
						width,
					)}
				>
					{value}
				</span>
				<Separator orientation="vertical" className="h-full" />
				<Slider
					min={0}
					max={options.length - 1}
					step={1}
					value={[options.indexOf(value)]}
					onValueChange={(value) => onChange(options[value[0]])}
				/>
			</div>
		</div>
	);
}
