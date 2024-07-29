"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeDisplay } from "@/components/code/CodeDisplay";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

import {
	fontSizesOptions,
	roundedOptions,
	paddingXOptions,
	opacityOptions,
	heightOptions,
} from "@/lib/tailwindClasses";
import { ColorPicker } from "@/components/editor-tools/ColorPicker";
import { BorderType } from "@/components/editor-tools/BorderType";
import { BorderWidth } from "@/components/editor-tools/BorderWidth";
import { GenericSliderSelector } from "@/components/editor-tools/GenericSliderSelector";
import { Shadow } from "@/components/editor-tools/Shadow";
import { FontWeight as FontWeightComponent } from "@/components/editor-tools/FontWeight";
import { CollapsibleGroup } from "@/components/layout/CollapsibleGroup";
import { InputTool } from "@/components/editor-tools/InputTool";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useStyleManagerStore } from "@/store/useStyleManagerStore";
import type { ButtonStyleName } from "@/types/style";

export default function Home() {
	const { styles, currentStyle, setStyle, setCurrentStyle } =
		useStyleManagerStore();
	const [buttonText, setButtonText] = useState("Hello world");

	// Group Visibility
	const [visibleGroups, setVisibleGroups] = useState({
		text: true,
		size: true,
		background: true,
		border: true,
		effects: false,
		hover: false,
	});

	const currentStyleFull = styles[currentStyle];

	const [openStyles, setOpenStyles] = useState<string[]>([currentStyle]);

	const toggleGroup = (group: keyof typeof visibleGroups) => {
		setVisibleGroups((prev) => ({ ...prev, [group]: !prev[group] }));
	};

	return (
		<div className="w-full h-screen flex justify-center items-center p-6 bg-stone-300">
			<Card className="w-full max-w-7xl h-full flex gap-6">
				<div className="p-6 w-[500px] overflow-y-auto">
					<Accordion
						value={openStyles}
						onValueChange={setOpenStyles}
						type="multiple"
						className="w-full"
					>
						{Object.entries(styles).map(([styleName, styleProps]) => {
							const styleNameTyped = styleName as ButtonStyleName;
							const buttonClassesForStyle = cn(
								styleProps.text.textColor,
								styleProps.text.fontSize,
								styleProps.text.fontWeight,
								styleProps.background.bgColor,
								styleProps.border?.borderColor,
								styleProps.border?.borderWidth,
								styleProps.border?.borderStyle,
								styleProps.border?.rounded,
								styleProps.size?.height,
								styleProps.size?.paddingX,
								styleProps.effects?.shadow,
								styleProps.effects?.opacity,
							);

							return (
								<AccordionItem value={styleNameTyped} key={styleNameTyped}>
									<AccordionTrigger>{styleNameTyped}</AccordionTrigger>
									<AccordionContent>
										<div className="flex items-center space-x-2 pt-2">
											<Button
												variant={styleNameTyped}
												className={buttonClassesForStyle}
											>
												{buttonText}
											</Button>
											<span className="text-sm text-gray-500">
												{styleNameTyped}
											</span>
										</div>
									</AccordionContent>
								</AccordionItem>
							);
						})}
					</Accordion>
				</div>
				<div className="p-6 border-l border-border flex-1 space-y-6 overflow-y-auto">
					<Tabs defaultValue="toggles">
						<TabsList className="grid w-full grid-cols-2">
							<TabsTrigger value="toggles">Editor</TabsTrigger>
							<TabsTrigger value="code">Code</TabsTrigger>
						</TabsList>
						<TabsContent value="toggles" className="space-y-3">
							<div className="mb-4">
								<Label>Current Style</Label>
								<Select
									value={currentStyle}
									onValueChange={(value) => {
										setCurrentStyle(value as ButtonStyleName);
										setOpenStyles(
											openStyles ? [...openStyles, value] : [value],
										);
									}}
								>
									<SelectTrigger>
										<SelectValue placeholder="Theme" />
									</SelectTrigger>
									<SelectContent>
										{Object.keys(styles).map((style) => (
											<SelectItem key={style} value={style}>
												{style}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
							{/* Text Group */}
							<CollapsibleGroup
								title="text"
								isVisible={visibleGroups.text}
								className="grid grid-cols-2 gap-6"
							>
								<InputTool
									label="Button Text"
									value={buttonText}
									onChange={setButtonText}
								/>
								<ColorPicker
									label="Text Color"
									value={currentStyleFull.text.textColor}
									onChange={(value) =>
										setStyle(currentStyle, "text", "textColor", value)
									}
								/>
								<GenericSliderSelector
									label="Font Size"
									options={fontSizesOptions}
									value={currentStyleFull.text.fontSize}
									onChange={(value) =>
										setStyle(currentStyle, "text", "fontSize", value)
									}
									width="w-20"
								/>
								<FontWeightComponent
									label="Font Weight"
									fontWeight={currentStyleFull.text.fontWeight}
									setFontWeight={(value) =>
										setStyle(currentStyle, "text", "fontWeight", value)
									}
								/>
							</CollapsibleGroup>

							{/* Size Group */}
							<CollapsibleGroup
								title="size"
								isVisible={visibleGroups.size}
								className="grid grid-cols-2 gap-6"
							>
								{currentStyleFull.size?.paddingX && (
									<>
										<GenericSliderSelector
											label="Padding (X)"
											options={paddingXOptions}
											value={currentStyleFull.size.paddingX}
											onChange={(value) =>
												setStyle(currentStyle, "size", "paddingX", value)
											}
										/>
										<GenericSliderSelector
											label="Height"
											options={heightOptions}
											value={currentStyleFull.size.height}
											onChange={(value) =>
												setStyle(currentStyle, "size", "height", value)
											}
										/>
									</>
								)}
							</CollapsibleGroup>

							{/* Background Group */}
							<CollapsibleGroup
								title="background"
								isVisible={visibleGroups.background}
							>
								<ColorPicker
									label="Background Color"
									value={currentStyleFull.background.bgColor}
									onChange={(value) =>
										setStyle(currentStyle, "background", "bgColor", value)
									}
								/>
							</CollapsibleGroup>

							{/* Border Group */}
							<CollapsibleGroup
								title="border"
								isVisible={visibleGroups.border}
								className="grid grid-cols-2 gap-6"
							>
								{currentStyleFull.border?.borderStyle && (
									<>
										<BorderType
											label="Border Style"
											borderStyle={currentStyleFull.border.borderStyle}
											setBorderStyle={(value) =>
												setStyle(currentStyle, "border", "borderStyle", value)
											}
										/>
										<BorderWidth
											label="Border Width"
											borderWidth={currentStyleFull.border.borderWidth}
											setBorderWidth={(value) =>
												setStyle(currentStyle, "border", "borderWidth", value)
											}
										/>
										<ColorPicker
											label="Border Color"
											value={currentStyleFull.border.borderColor}
											onChange={(value) =>
												setStyle(currentStyle, "border", "borderColor", value)
											}
										/>
										<GenericSliderSelector
											label="Rounded"
											options={roundedOptions}
											value={currentStyleFull.border.rounded}
											onChange={(value) =>
												setStyle(currentStyle, "border", "rounded", value)
											}
											width="w-24"
										/>
									</>
								)}
							</CollapsibleGroup>

							{/* Effects Group */}
							<CollapsibleGroup
								title="effects"
								isVisible={visibleGroups.effects}
							>
								{currentStyleFull.effects?.shadow && (
									<>
										<Shadow
											label="Shadow"
											shadow={currentStyleFull.effects.shadow}
											setShadow={(value) =>
												setStyle(currentStyle, "effects", "shadow", value)
											}
										/>
										<GenericSliderSelector
											label="Opacity"
											options={opacityOptions}
											value={currentStyleFull.effects.opacity}
											onChange={(value) =>
												setStyle(currentStyle, "effects", "opacity", value)
											}
											width="w-24"
										/>
									</>
								)}
							</CollapsibleGroup>
						</TabsContent>
						<TabsContent value="code">
							<CodeDisplay />
						</TabsContent>
					</Tabs>
				</div>
			</Card>
		</div>
	);
}
