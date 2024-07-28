import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "./ui/separator";

const borderWidthsOptions = [
	["border-0", "h-0"],
	["border", "h-[1px]"],
	["border-2", "h-[2px]"],
	["border-4", "h-[4px]"],
	["border-8", "h-[8px]"],
];

export function BorderWidth({
	label,
	borderWidth,
	setBorderWidth,
}: {
	label: string;
	borderWidth: string;
	setBorderWidth: (value: string) => void;
}) {
	return (
		<div className="flex flex-col items-start justify-stretch py-2 gap-3">
			<Label className="font-semibold">{label}</Label>
			<div className="flex justify-start items-stretch w-full gap-2 border border-input rounded-md px-4 py-2 h-14">
				<span className="text-sm font-medium shrink-0 w-16 flex flex-col items-start gap-1">
					{borderWidth}

					<div
						className={`w-16 ${borderWidthsOptions.find((option) => option[0] === borderWidth)?.[1]} bg-black`}
					/>
				</span>
				<Separator orientation="vertical" className="h-full" />
				<Slider
					min={0}
					max={borderWidthsOptions.length - 1}
					step={1}
					value={[
						borderWidthsOptions.findIndex(
							([borderWidthOption]) => borderWidthOption === borderWidth,
						),
					]}
					onValueChange={(value) =>
						setBorderWidth(borderWidthsOptions[value[0]][0])
					}
				/>
			</div>
		</div>
	);
}
