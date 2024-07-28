import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Label } from "@/components/ui/label";
import { borderStylesOptions, shadowOptions } from "@/lib/tailwindClasses";

export function Shadow({
	label,
	shadow,
	setShadow,
}: {
	label: string;
	shadow: string;
	setShadow: (value: string) => void;
}) {
	return (
		<div className="flex flex-col items-start w-fit py-2 gap-3">
			<Label className="font-semibold">{label}</Label>
			<ToggleGroup
				type="single"
				size="sm"
				variant="outline"
				className="flex justify-start flex-wrap gap-2"
				value={shadow}
				onValueChange={setShadow}
			>
				{shadowOptions.map((option) => (
					<ToggleGroupItem className="px-2 gap-2" value={option} key={option}>
						<span className="text-sm ml-1">{option}</span>
						<div
							className={`w-4 h-4 rounded-md border border-input ${option}`}
						/>
					</ToggleGroupItem>
				))}
			</ToggleGroup>
		</div>
	);
}
