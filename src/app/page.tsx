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
import type { ButtonStyleName, StyleGroup, StyleProperty } from "@/types/style";

export default function Home() {
	const { styles, currentStyle, setGroupStyleProperty, setCurrentStyle } =
		useStyleManagerStore();
	const [buttonText, setButtonText] = useState("Hello world");

	const currentStyleFull = styles.find(
		(style) => style.styleName === currentStyle,
	);

	const [openStyles, setOpenStyles] = useState<string[]>([currentStyle]);

	if (!currentStyleFull) {
		return null;
	}

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
						{styles.map((styleProps) => {
							const styleNameTyped = styleProps.styleName as ButtonStyleName;

							const applyProperty = (
								isApplied: boolean,
								propertyValue: string,
							) => {
								return isApplied ? propertyValue : undefined;
							};
							const buttonClassesForStyle = cn(
								applyProperty(
									styleProps.text.isApplied,
									styleProps.text.properties.textColor,
								),
								applyProperty(
									styleProps.text.isApplied,
									styleProps.text.properties.fontSize,
								),
								applyProperty(
									styleProps.text.isApplied,
									styleProps.text.properties.fontWeight,
								),
								applyProperty(
									styleProps.background.isApplied,
									styleProps.background.properties.bgColor,
								),
								applyProperty(
									styleProps.border.isApplied,
									styleProps.border.properties.borderColor,
								),
								applyProperty(
									styleProps.border.isApplied,
									styleProps.border.properties.borderWidth,
								),
								applyProperty(
									styleProps.border.isApplied,
									styleProps.border.properties.borderStyle,
								),
								applyProperty(
									styleProps.border.isApplied,
									styleProps.border.properties.rounded,
								),
								applyProperty(
									styleProps.size.isApplied,
									styleProps.size.properties.height,
								),
								applyProperty(
									styleProps.size.isApplied,
									styleProps.size.properties.paddingX,
								),
								applyProperty(
									styleProps.effects.isApplied,
									styleProps.effects.properties.shadow,
								),
								applyProperty(
									styleProps.effects.isApplied,
									styleProps.effects.properties.opacity,
								),
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
										{styles.map((style) => (
											<SelectItem key={style.styleName} value={style.styleName}>
												{style.styleName}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
							{/* Text Group */}
							<CollapsibleGroup
								title="text"
								className="grid grid-cols-2 gap-y-2 gap-x-4"
							>
								<InputTool
									label="Button Text"
									value={buttonText}
									onChange={setButtonText}
									isDisabled={!currentStyleFull.text.isApplied}
								/>
								<ColorPicker
									label="Text Color"
									isDisabled={!currentStyleFull.text.isApplied}
									value={currentStyleFull.text.properties.textColor}
									onChange={(value) => {
										console.log(value);
										setGroupStyleProperty(
											currentStyle,
											"text",
											"textColor",
											value,
										);
									}}
								/>
								<GenericSliderSelector
									label="Font Size"
									isDisabled={!currentStyleFull.text.isApplied}
									options={fontSizesOptions}
									value={currentStyleFull.text.properties.fontSize}
									onChange={(value) =>
										setGroupStyleProperty(
											currentStyle,
											"text",
											"fontSize",
											value,
										)
									}
									width="w-20"
								/>
								<FontWeightComponent
									label="Font Weight"
									isDisabled={!currentStyleFull.text.isApplied}
									fontWeight={currentStyleFull.text.properties.fontWeight}
									setFontWeight={(value) =>
										setGroupStyleProperty(
											currentStyle,
											"text",
											"fontWeight",
											value,
										)
									}
								/>
							</CollapsibleGroup>

							{/* Size Group */}
							<CollapsibleGroup
								defaultOpen
								title="size"
								className="grid grid-cols-2 gap-6"
							>
								<GenericSliderSelector
									isDisabled={!currentStyleFull.size.isApplied}
									label="Padding (X)"
									options={paddingXOptions}
									value={currentStyleFull.size.properties.paddingX}
									onChange={(value) =>
										setGroupStyleProperty(
											currentStyle,
											"size",
											"paddingX",
											value,
										)
									}
								/>
								<GenericSliderSelector
									isDisabled={!currentStyleFull.size.isApplied}
									label="Height"
									options={heightOptions}
									value={currentStyleFull.size.properties.height}
									onChange={(value) =>
										setGroupStyleProperty(currentStyle, "size", "height", value)
									}
								/>
							</CollapsibleGroup>

							{/* Background Group */}
							<CollapsibleGroup title="background" defaultOpen>
								<ColorPicker
									isDisabled={!currentStyleFull.background.isApplied}
									label="Background Color"
									value={currentStyleFull.background.properties.bgColor}
									onChange={(value) =>
										setGroupStyleProperty(
											currentStyle,
											"background",
											"bgColor",
											value,
										)
									}
								/>
							</CollapsibleGroup>

							{/* Border Group */}
							<CollapsibleGroup
								title="border"
								className="grid grid-cols-2 gap-6"
							>
								<BorderType
									label="Border Style"
									isDisabled={!currentStyleFull.border.isApplied}
									borderStyle={currentStyleFull.border.properties.borderStyle}
									setBorderStyle={(value) =>
										setGroupStyleProperty(
											currentStyle,
											"border",
											"borderStyle",
											value,
										)
									}
								/>
								<BorderWidth
									isDisabled={!currentStyleFull.border.isApplied}
									label="Border Width"
									borderWidth={currentStyleFull.border.properties.borderWidth}
									setBorderWidth={(value) =>
										setGroupStyleProperty(
											currentStyle,
											"border",
											"borderWidth",
											value,
										)
									}
								/>
								<ColorPicker
									isDisabled={!currentStyleFull.border.isApplied}
									label="Border Color"
									value={currentStyleFull.border.properties.borderColor}
									onChange={(value) =>
										setGroupStyleProperty(
											currentStyle,
											"border",
											"borderColor",
											value,
										)
									}
								/>
								<GenericSliderSelector
									isDisabled={!currentStyleFull.border.isApplied}
									label="Rounded"
									options={roundedOptions}
									value={currentStyleFull.border.properties.rounded}
									onChange={(value) =>
										setGroupStyleProperty(
											currentStyle,
											"border",
											"rounded",
											value,
										)
									}
									width="w-24"
								/>
							</CollapsibleGroup>

							{/* Effects Group */}
							<CollapsibleGroup title="effects">
								<Shadow
									label="Shadow"
									isDisabled={!currentStyleFull.effects.isApplied}
									shadow={currentStyleFull.effects.properties.shadow}
									setShadow={(value) =>
										setGroupStyleProperty(
											currentStyle,
											"effects",
											"shadow",
											value,
										)
									}
								/>
								<GenericSliderSelector
									label="Opacity"
									isDisabled={!currentStyleFull.effects.isApplied}
									options={opacityOptions}
									value={currentStyleFull.effects.properties.opacity}
									onChange={(value) =>
										setGroupStyleProperty(
											currentStyle,
											"effects",
											"opacity",
											value,
										)
									}
									width="w-24"
								/>
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
