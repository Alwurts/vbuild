import React, { useState } from "react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui-editor/popover";
import { Button } from "@/components/ui-editor/button";
import { BACKGROUND_COLOR_CLASSNAMES_SWATCHES } from "@/lib/tailwind/tailwindClasses/index";
import { Separator } from "@/components/ui-editor/separator";
import { cn } from "@/lib/utils";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../ui-editor/accordion";
import { ScrollArea } from "../ui-editor/scroll-area";

const THEME_COLORS = [
	{ name: "Primary", class: "bg-primary" },
	{ name: "Secondary", class: "bg-secondary" },
	{ name: "Accent", class: "bg-accent" },
	{ name: "Background", class: "bg-background" },
	{ name: "Foreground", class: "bg-foreground" },
	{ name: "Muted", class: "bg-muted" },
	{ name: "Card", class: "bg-card" },
	{ name: "Popover", class: "bg-popover" },
	{ name: "Border", class: "bg-border" },
	{ name: "Input", class: "bg-input" },
	{ name: "Ring", class: "bg-ring" },
];

export const ColorPicker = ({
	id,
	label,
	value,
	onChange,
	isDisabled,
	className,
}: {
	id: string;
	label: string;
	value: string;
	onChange: (color: string) => void;
	isDisabled?: boolean;
	className?: string;
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const type = value.startsWith("border-")
		? "border"
		: value.startsWith("text-")
			? "text"
			: "bg";

	let bgParsedValue = value;

	if (type === "text") {
		bgParsedValue = value.replace("text-", "bg-");
	} else if (type === "border") {
		bgParsedValue = value.replace("border-", "bg-");
	}

	const bgToType = (color: string) => {
		if (type === "text") {
			return color.replace("bg-", "text-");
		}
		if (type === "border") {
			return color.replace("bg-", "border-");
		}
		return color;
	};

	const handleColorChange = (color: string) => {
		onChange(bgToType(color));
		setIsOpen(false);
	};

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button
					id={id}
					title={value}
					aria-label={label}
					variant="outline"
					size="sm"
					className={cn("space-x-2 px-3 flex justify-between", className)}
					disabled={isDisabled}
				>
					<span className="text-sm font-normal truncate">{value}</span>
					<div
						className={`w-6 h-6 flex-shrink-0 rounded-md border ${bgParsedValue}`}
					/>
				</Button>
			</PopoverTrigger>
			<PopoverContent align="end" className="w-64 h-96 p-0">
				<ScrollArea className="h-full w-full p-4">
					<p className="text-sm font-semibold text-foreground-editor">
						{label}
					</p>
					<Separator className="mt-3" />
					<Accordion
						defaultValue={["theme-colors", "tailwind-colors"]}
						type="multiple"
						className="w-full text-sm"
					>
						<AccordionItem value="theme-colors">
							<AccordionTrigger>Theme Colors</AccordionTrigger>
							<AccordionContent>
								<div className="grid grid-cols-2 gap-x-2">
									{THEME_COLORS.map((color) => (
										<Button
											key={color.name}
											variant="ghost"
											size="sm"
											className={cn(
												"flex gap-2 justify-start h-8 px-2",
												value === color.class &&
													"border-2 border-primary-editor",
											)}
											onClick={() => handleColorChange(color.class)}
										>
											<div
												className={`w-5 h-5 rounded shrink-0 border border-stone-300 ${color.class}`}
											/>
											<span className="text-xs">{color.name}</span>
										</Button>
									))}
								</div>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="tailwind-colors">
							<AccordionTrigger>Tailwind Colors</AccordionTrigger>
							<AccordionContent>
								<div className="flex flex-col gap-1 ">
									{BACKGROUND_COLOR_CLASSNAMES_SWATCHES.slice(1).map(
										(colorGroup, index) => (
											<div key={colorGroup[0]} className="flex flex-row gap-1">
												{colorGroup.map((color) => (
													<button
														type="button"
														title={bgToType(color)}
														key={color}
														className={cn(
															`w-4 h-4 rounded-sm ${color} border border-stone-300`,
															value === color &&
																"border-2 border-primary-editor",
														)}
														onClick={() => handleColorChange(color)}
													/>
												))}
											</div>
										),
									)}
								</div>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</ScrollArea>
			</PopoverContent>
		</Popover>
	);
};
