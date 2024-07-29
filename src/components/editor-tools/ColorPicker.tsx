import React, { useState } from "react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { bgColorsOptions } from "@/lib/tailwindClasses";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const ColorPicker = ({
	label,
	value, // Can be bg- or text- or border-
	onChange,
	isDisabled,
}: {
	label: string;
	value: string;
	onChange: (color: string) => void;
	isDisabled: boolean;
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const type = value.startsWith("border-")
		? "border"
		: value.startsWith("text-")
			? "text"
			: "bg";

	let bgParsedValue = value;

	if (type === "bg") {
		bgParsedValue = value;
	} else if (type === "text") {
		bgParsedValue = value.replace("text-", "bg-");
	} else if (type === "border") {
		bgParsedValue = value.replace("border-", "bg-");
	}

	const handleColorChange = (color: string) => {
		if (type === "bg") {
			onChange(color);
		} else if (type === "text") {
			onChange(color.replace("bg-", "text-"));
		} else if (type === "border") {
			onChange(color.replace("bg-", "border-"));
		}
		setIsOpen(false);
	};

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<div className="flex flex-col items-start w-fit py-2 gap-3">
				<Label className={cn("font-semibold", isDisabled && "opacity-50")}>
					{label}
				</Label>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						size="sm"
						className="space-x-2 px-1.5"
						disabled={isDisabled}
					>
						<span className="text-sm ml-1">{value}</span>
						<div className={`w-6 h-6 rounded-md border ${bgParsedValue}`} />
					</Button>
				</PopoverTrigger>
			</div>
			<PopoverContent className="w-64 h-96 p-2 space-y-2 overflow-y-auto">
				<p className="text-sm text-stone-500">Background Colors</p>
				<Separator />
				<div className="flex flex-col gap-1 ">
					{bgColorsOptions.map((colorGroup) => (
						<div key={colorGroup[0]} className="flex flex-row gap-1">
							{colorGroup.map((color) => (
								<button
									type="button"
									title={color}
									key={color}
									className={`w-4 h-4 rounded-sm ${color} border border-stone-300`}
									onClick={() => {
										handleColorChange(color);
									}}
								/>
							))}
						</div>
					))}
				</div>
			</PopoverContent>
		</Popover>
	);
};
