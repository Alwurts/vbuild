import { Label } from "@/components/ui-editor/label";
import { Slider } from "@/components/ui-editor/slider";
import { Separator } from "@/components/ui-editor/separator";
import { fontWeightsOptions } from "@/lib/tailwindClasses";
import { cn } from "@/lib/utils";

export function FontWeight({
	label,
	fontWeight,
	setFontWeight,
	isDisabled,
}: {
	label: string;
	fontWeight: string;
	setFontWeight: (value: string) => void;
	isDisabled: boolean;
}) {
	return (
		<div className="flex flex-col items-start justify-stretch py-2 gap-3">
			<Label className={cn("font-semibold", isDisabled && "opacity-50")}>
				{label}
			</Label>
			<div className="flex justify-start items-center w-full gap-2 border border-input rounded-md px-4 py-2 h-14">
				<span
					className={cn(
						"text-sm font-medium shrink-0 w-24 flex flex-col items-start gap-1",
						isDisabled && "opacity-50",
					)}
				>
					<span className="whitespace-nowrap">{fontWeight}</span>
					<span className={`${fontWeight}`}>AaBbCc</span>
				</span>
				<Separator orientation="vertical" className="h-full" />
				<Slider
					disabled={isDisabled}
					min={0}
					max={fontWeightsOptions.length - 1}
					step={1}
					value={[fontWeightsOptions.indexOf(fontWeight)]}
					onValueChange={(value) => setFontWeight(fontWeightsOptions[value[0]])}
				/>
			</div>
		</div>
	);
}
