import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Label } from "@/components/ui/label";
import { borderStylesOptions } from "@/lib/tailwindClasses";

export function BorderType({
	label,
	borderStyle,
	setBorderStyle,
}: {
	label: string;
	borderStyle: string;
	setBorderStyle: (value: string) => void;
}) {
	return (
		<div className="flex flex-col items-start w-fit py-2 gap-3">
			<Label className="font-semibold">{label}</Label>
			<ToggleGroup
				type="single"
				size="sm"
				variant="outline"
				className="flex justify-start flex-wrap gap-2"
				value={borderStyle}
				onValueChange={setBorderStyle}
			>
				{borderStylesOptions.map((option) => (
					<ToggleGroupItem className="px-2 gap-2" value={option} key={option}>
						<span className="text-sm ml-1">{option}</span>
						<div
							className={`w-6 h-6 rounded-md border-2 border-black ${option}`}
						/>
					</ToggleGroupItem>
				))}
			</ToggleGroup>
		</div>
	);
}
