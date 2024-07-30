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
import type { ButtonVariantName } from "@/types/style";
import ComponentRender from "@/components/display/ComponentRender";

export default function Home() {
	const {
		variants,
		currentVariant,
		setGroupStyleProperty,
		toggleGroupIsApplied,
		setCurrentVariant: setCurrentStyle,
	} = useStyleManagerStore();
	const [buttonText, setButtonText] = useState("Hello world");

	const currentVariantStyle = variants.variant.find(
		(style) => style.styleName === currentVariant.variant,
	);

	const currentSizeStyle = variants.size.find(
		(style) => style.styleName === currentVariant.size,
	);

	const [openVariants, setOpenVariants] = useState<string[]>([
		currentVariant.variant,
	]);

	if (!currentVariantStyle || !currentSizeStyle) {
		return null;
	}

	return (
		<div className="w-full h-screen flex justify-center items-center p-6 bg-stone-300">
			<Card className="w-full max-w-7xl h-full flex gap-6">
				<ComponentRender openVariants={openVariants} setOpenVariants={setOpenVariants} />
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
									value={currentVariant.variant}
									onValueChange={(value) => {
										setCurrentStyle({
											variantType: "variant",
											name: value as ButtonVariantName,
										});
										setOpenVariants(
											openVariants ? [...openVariants, value] : [value],
										);
									}}
								>
									<SelectTrigger>
										<SelectValue placeholder="Theme" />
									</SelectTrigger>
									<SelectContent>
										{variants.variant.map((style) => (
											<SelectItem key={style.styleName} value={style.styleName}>
												{style.styleName}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
							{/* Text Group */}
							<CollapsibleGroup
								styleIsApplied={currentVariantStyle.text.isApplied}
								toggleGroupIsApplied={() => {
									toggleGroupIsApplied({
										variantType: "variant",
										styleName: currentVariant.variant,
										group: "text",
									});
								}}
								title="text"
								className="grid grid-cols-2 gap-y-2 gap-x-4"
							>
								<InputTool
									label="Button Text"
									value={buttonText}
									onChange={setButtonText}
									isDisabled={!currentVariantStyle.text.isApplied}
								/>
								<ColorPicker
									label="Text Color"
									isDisabled={!currentVariantStyle.text.isApplied}
									value={currentVariantStyle.text.properties.textColor}
									onChange={(value) => {
										console.log(value);
										setGroupStyleProperty({
											variantType: "variant",
											variantName: currentVariant.variant,
											groupStyleName: "text",
											property: "textColor",
											value: value,
										});
									}}
								/>
								<GenericSliderSelector
									label="Font Size"
									isDisabled={!currentVariantStyle.text.isApplied}
									options={fontSizesOptions}
									value={currentVariantStyle.text.properties.fontSize}
									onChange={(value) =>
										setGroupStyleProperty({
											variantType: "variant",
											variantName: currentVariant.variant,
											groupStyleName: "text",
											property: "fontSize",
											value: value,
										})
									}
									width="w-20"
								/>
								<FontWeightComponent
									label="Font Weight"
									isDisabled={!currentVariantStyle.text.isApplied}
									fontWeight={currentVariantStyle.text.properties.fontWeight}
									setFontWeight={(value) =>
										setGroupStyleProperty({
											variantType: "variant",
											variantName: currentVariant.variant,
											groupStyleName: "text",
											property: "fontWeight",
											value: value,
										})
									}
								/>
							</CollapsibleGroup>

							{/* Size Group */}
							<CollapsibleGroup
								styleIsApplied={currentSizeStyle.size.isApplied}
								toggleGroupIsApplied={() => {
									toggleGroupIsApplied({
										variantType: "size",
										styleName: currentVariant.size,
										group: "size",
									});
								}}
								defaultOpen
								title="size"
								className="grid grid-cols-2 gap-6"
							>
								<GenericSliderSelector
									isDisabled={!currentSizeStyle.size.isApplied}
									label="Padding (X)"
									options={paddingXOptions}
									value={currentSizeStyle.size.properties.paddingX}
									onChange={(value) =>
										setGroupStyleProperty({
											variantType: "size",
											variantName: currentVariant.size,
											groupStyleName: "size",
											property: "paddingX",
											value: value,
										})
									}
								/>
								<GenericSliderSelector
									isDisabled={!currentSizeStyle.size.isApplied}
									label="Height"
									options={heightOptions}
									value={currentSizeStyle.size.properties.height}
									onChange={(value) =>
										setGroupStyleProperty({
											variantType: "size",
											variantName: currentVariant.size,
											groupStyleName: "size",
											property: "height",
											value: value,
										})
									}
								/>
							</CollapsibleGroup>

							{/* Background Group */}
							<CollapsibleGroup
								styleIsApplied={currentVariantStyle.background.isApplied}
								toggleGroupIsApplied={() => {
									toggleGroupIsApplied({
										variantType: "variant",
										styleName: currentVariant.variant,
										group: "background",
									});
								}}
								title="background"
								defaultOpen
							>
								<ColorPicker
									isDisabled={!currentVariantStyle.background.isApplied}
									label="Background Color"
									value={currentVariantStyle.background.properties.bgColor}
									onChange={(value) =>
										setGroupStyleProperty({
											variantType: "variant",
											variantName: currentVariant.variant,
											groupStyleName: "background",
											property: "bgColor",
											value: value,
										})
									}
								/>
							</CollapsibleGroup>

							{/* Border Group */}
							<CollapsibleGroup
								styleIsApplied={currentVariantStyle.border.isApplied}
								toggleGroupIsApplied={() => {
									toggleGroupIsApplied({
										variantType: "variant",
										styleName: currentVariant.variant,
										group: "border",
									});
								}}
								title="border"
								className="grid grid-cols-2 gap-6"
							>
								<BorderType
									label="Border Style"
									isDisabled={!currentVariantStyle.border.isApplied}
									borderStyle={
										currentVariantStyle.border.properties.borderStyle
									}
									setBorderStyle={(value) =>
										setGroupStyleProperty({
											variantType: "variant",
											variantName: currentVariant.variant,
											groupStyleName: "border",
											property: "borderStyle",
											value: value,
										})
									}
								/>
								<BorderWidth
									isDisabled={!currentVariantStyle.border.isApplied}
									label="Border Width"
									borderWidth={
										currentVariantStyle.border.properties.borderWidth
									}
									setBorderWidth={(value) =>
										setGroupStyleProperty({
											variantType: "variant",
											variantName: currentVariant.variant,
											groupStyleName: "border",
											property: "borderWidth",
											value: value,
										})
									}
								/>
								<ColorPicker
									isDisabled={!currentVariantStyle.border.isApplied}
									label="Border Color"
									value={currentVariantStyle.border.properties.borderColor}
									onChange={(value) =>
										setGroupStyleProperty({
											variantType: "variant",
											variantName: currentVariant.variant,
											groupStyleName: "border",
											property: "borderColor",
											value: value,
										})
									}
								/>
								<GenericSliderSelector
									isDisabled={!currentVariantStyle.border.isApplied}
									label="Rounded"
									options={roundedOptions}
									value={currentVariantStyle.border.properties.rounded}
									onChange={(value) =>
										setGroupStyleProperty({
											variantType: "variant",
											variantName: currentVariant.variant,
											groupStyleName: "border",
											property: "rounded",
											value: value,
										})
									}
									width="w-24"
								/>
							</CollapsibleGroup>

							{/* Effects Group */}
							<CollapsibleGroup
								styleIsApplied={currentVariantStyle.effects.isApplied}
								toggleGroupIsApplied={() => {
									toggleGroupIsApplied({
										variantType: "variant",
										styleName: currentVariant.variant,
										group: "effects",
									});
								}}
								title="effects"
							>
								<Shadow
									label="Shadow"
									isDisabled={!currentVariantStyle.effects.isApplied}
									shadow={currentVariantStyle.effects.properties.shadow}
									setShadow={(value) =>
										setGroupStyleProperty({
											variantType: "variant",
											variantName: currentVariant.variant,
											groupStyleName: "effects",
											property: "shadow",
											value: value,
										})
									}
								/>
								<GenericSliderSelector
									label="Opacity"
									isDisabled={!currentVariantStyle.effects.isApplied}
									options={opacityOptions}
									value={currentVariantStyle.effects.properties.opacity}
									onChange={(value) =>
										setGroupStyleProperty({
											variantType: "variant",
											variantName: currentVariant.variant,
											groupStyleName: "effects",
											property: "opacity",
											value: value,
										})
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
