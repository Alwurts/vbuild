import { Label } from "@/components/ui-editor/label";
import { Slider } from "@/components/ui-editor/slider";
import { Separator } from "@/components/ui-editor/separator";
import { cn } from "@/lib/utils";

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
	isDisabled,
}: {
	label: string;
	borderWidth: string;
	setBorderWidth: (value: string) => void;
	isDisabled: boolean;
}) {
	return (
		<div className="flex flex-col items-start justify-stretch py-2 gap-3">
			<Label className={cn("font-semibold", isDisabled && "opacity-50")}>
				{label}
			</Label>
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
					disabled={isDisabled}
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
