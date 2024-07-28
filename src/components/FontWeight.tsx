import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "./ui/separator";
import { fontWeightsOptions } from "@/lib/tailwindClasses";

export function FontWeight({
	label,
	fontWeight,
	setFontWeight,
}: {
	label: string;
	fontWeight: string;
	setFontWeight: (value: string) => void;
}) {
	return (
		<div className="flex flex-col items-start justify-stretch py-2 gap-3">
			<Label className="font-semibold">{label}</Label>
			<div className="flex justify-start items-center w-full gap-2 border border-input rounded-md px-4 py-2 h-14">
				<span className="text-sm font-medium shrink-0 w-24 flex flex-col items-start gap-1">
					<span className="whitespace-nowrap">{fontWeight}</span>
					<span className={`${fontWeight}`}>AaBbCc</span>
				</span>
				<Separator orientation="vertical" className="h-full" />
				<Slider
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
