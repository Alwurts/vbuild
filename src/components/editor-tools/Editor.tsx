import {
	fontSizesOptions,
	paddingXOptions,
	heightOptions,
	roundedOptions,
	opacityOptions,
	paddingYOptions,
} from "@/lib/tailwindClasses";
import { Label } from "@/components/ui-editor/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui-editor/select";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui-editor/accordion";
import { BorderType } from "@/components/editor-tools/BorderType";
import { BorderWidth } from "@/components/editor-tools/BorderWidth";
import { ColorPicker } from "@/components/editor-tools/ColorPicker";
import { GenericSliderSelector } from "@/components/editor-tools/GenericSliderSelector";
import { FontWeight } from "@/components/editor-tools/FontWeight";
import { InputTool } from "@/components/editor-tools/InputTool";
import { Shadow } from "@/components/editor-tools/Shadow";
import { CollapsibleGroup } from "@/components/layout/CollapsibleGroup";
import { useStyleManagerStore } from "@/store/useStyleManagerStore";
import type { ButtonSizeName, ButtonVariantName } from "@/types/button";
import type { ComponentType } from "@/types/style";
import type { BadgeVariantName } from "@/types/badge";

export function Editor({
	openVariants,
	setOpenVariants,
}: {
	openVariants: (ButtonVariantName & BadgeVariantName)[];
	setOpenVariants: (value: (ButtonVariantName & BadgeVariantName)[]) => void;
}) {
	const {
		styles,
		currentComponent,
		currentVariant,
		setCurrentVariant,
		setStyleProperty,
		toggleGroupIsApplied,
		componentText,
		setComponentText,
		setCurrentComponent,
	} = useStyleManagerStore();

	const currentComponentStyle = styles[currentComponent];
	const currentVariantStyle =
		// @ts-ignore
		currentComponentStyle.variant[
			currentComponent === "card" ? "default" : currentVariant.variant
		];

	const currentSizeStyle =
		currentComponent === "button" &&
		"size" in currentComponentStyle &&
		currentVariant.size
			? // @ts-ignore
				currentComponentStyle.size?.[currentVariant.size]
			: null;

	if (!currentVariantStyle) {
		return null;
	}

	return (
		<div>
			<Accordion type="multiple" defaultValue={["variant"]}>
				<AccordionItem value="variant">
					<AccordionTrigger className="font-bold text-xl">
						{currentComponent === "card" ? "Card Style" : "Variant"}
					</AccordionTrigger>
					<AccordionContent className="flex flex-col gap-y-4 p-1">
						{currentComponent !== "card" && (
							<div>
								<Label className="font-semibold">Variant style</Label>
								<Select
									value={currentVariant.variant}
									onValueChange={(value) => {
										setCurrentVariant({
											styleType: "variant",
											name: value as ButtonVariantName | BadgeVariantName,
										});
										const valueTyped = value as ButtonVariantName &
											BadgeVariantName;
										setOpenVariants(
											openVariants
												? [...openVariants, valueTyped]
												: [valueTyped],
										);
									}}
								>
									<SelectTrigger>
										<SelectValue placeholder="Theme" />
									</SelectTrigger>
									<SelectContent>
										{Object.keys(currentComponentStyle.variant).map(
											(variantName) => (
												<SelectItem key={variantName} value={variantName}>
													{variantName}
												</SelectItem>
											),
										)}
									</SelectContent>
								</Select>
							</div>
						)}
						{/* Text Group */}
						<CollapsibleGroup
							styleIsApplied={currentVariantStyle.text.isApplied}
							toggleGroupIsApplied={() => {
								toggleGroupIsApplied({
									component: currentComponent,
									styleType: "variant",
									styleName: currentVariant.variant,
									group: "text",
								});
							}}
							title="text"
							className="grid grid-cols-2 gap-y-2 gap-x-4"
						>
							<InputTool
								label="Button Text"
								value={componentText}
								onChange={setComponentText}
								isDisabled={!currentVariantStyle.text.isApplied}
							/>
							<ColorPicker
								label="Text Color"
								isDisabled={!currentVariantStyle.text.isApplied}
								value={currentVariantStyle.text.properties.textColor}
								onChange={(value) => {
									setStyleProperty({
										component: currentComponent,
										styleType: "variant",
										styleName: currentVariant.variant,
										group: "text",
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
									setStyleProperty({
										component: currentComponent,
										styleType: "variant",
										styleName: currentVariant.variant,
										group: "text",
										property: "fontSize",
										value: value,
									})
								}
								width="w-20"
							/>
							<FontWeight
								label="Font Weight"
								isDisabled={!currentVariantStyle.text.isApplied}
								fontWeight={currentVariantStyle.text.properties.fontWeight}
								setFontWeight={(value) =>
									setStyleProperty({
										component: currentComponent,
										styleType: "variant",
										styleName: currentVariant.variant,
										group: "text",
										property: "fontWeight",
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
									component: currentComponent,
									styleType: "variant",
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
									setStyleProperty({
										component: currentComponent,
										styleType: "variant",
										styleName: currentVariant.variant,
										group: "background",
										property: "bgColor",
										value: value,
									})
								}
							/>
						</CollapsibleGroup>

						{currentComponent === "badge" && (
							<CollapsibleGroup
								styleIsApplied={currentVariantStyle.size.isApplied}
								toggleGroupIsApplied={() => {
									toggleGroupIsApplied({
										component: currentComponent,
										styleType: "variant",
										styleName: currentVariant.variant,
										group: "size",
									});
								}}
								defaultOpen
								title="size"
								className="grid grid-cols-2 gap-6"
								isCollapsible={false}
								showCheckbox={false}
							>
								<GenericSliderSelector
									isDisabled={!currentVariantStyle.size.isApplied}
									label="Padding (X)"
									options={paddingXOptions}
									value={currentVariantStyle.size.properties.paddingX}
									onChange={(value) =>
										setStyleProperty({
											component: currentComponent,
											styleType: "variant",
											styleName: currentVariant.variant,
											group: "size",
											property: "paddingX",
											value: value,
										})
									}
								/>
								<GenericSliderSelector
									isDisabled={!currentVariantStyle.size.isApplied}
									label="Padding (Y)"
									options={paddingYOptions}
									value={currentVariantStyle.size.properties.paddingY}
									onChange={(value) =>
										setStyleProperty({
											component: currentComponent,
											styleType: "variant",
											styleName: currentVariant.variant,
											group: "size",
											property: "paddingY",
											value: value,
										})
									}
								/>
							</CollapsibleGroup>
						)}

						{/* Add padding group for card */}
						{currentComponent === "card" && (
							<CollapsibleGroup
								styleIsApplied={currentVariantStyle.padding.isApplied}
								toggleGroupIsApplied={() => {
									toggleGroupIsApplied({
										component: currentComponent,
										styleType: "variant",
										styleName: "default",
										group: "padding",
									});
								}}
								title="padding"
								className="grid grid-cols-2 gap-6"
							>
								<GenericSliderSelector
									isDisabled={!currentVariantStyle.padding.isApplied}
									label="Padding (X)"
									options={paddingXOptions}
									value={currentVariantStyle.padding.properties.paddingX}
									onChange={(value) =>
										setStyleProperty({
											component: currentComponent,
											styleType: "variant",
											styleName: "default",
											group: "padding",
											property: "paddingX",
											value: value,
										})
									}
								/>
								<GenericSliderSelector
									isDisabled={!currentVariantStyle.padding.isApplied}
									label="Padding (Y)"
									options={paddingYOptions}
									value={currentVariantStyle.padding.properties.paddingY}
									onChange={(value) =>
										setStyleProperty({
											component: currentComponent,
											styleType: "variant",
											styleName: "default",
											group: "padding",
											property: "paddingY",
											value: value,
										})
									}
								/>
							</CollapsibleGroup>
						)}

						{/* Border Group */}
						<CollapsibleGroup
							styleIsApplied={currentVariantStyle.border.isApplied}
							toggleGroupIsApplied={() => {
								toggleGroupIsApplied({
									component: currentComponent,
									styleType: "variant",
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
								borderStyle={currentVariantStyle.border.properties.borderStyle}
								setBorderStyle={(value) =>
									setStyleProperty({
										component: currentComponent,
										styleType: "variant",
										styleName: currentVariant.variant,
										group: "border",
										property: "borderStyle",
										value: value,
									})
								}
							/>
							<BorderWidth
								isDisabled={!currentVariantStyle.border.isApplied}
								label="Border Width"
								borderWidth={currentVariantStyle.border.properties.borderWidth}
								setBorderWidth={(value) =>
									setStyleProperty({
										component: currentComponent,
										styleType: "variant",
										styleName: currentVariant.variant,
										group: "border",
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
									setStyleProperty({
										component: currentComponent,
										styleType: "variant",
										styleName: currentVariant.variant,
										group: "border",
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
									setStyleProperty({
										component: currentComponent,
										styleType: "variant",
										styleName: currentVariant.variant,
										group: "border",
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
									component: currentComponent,
									styleType: "variant",
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
									setStyleProperty({
										component: currentComponent,
										styleType: "variant",
										styleName: currentVariant.variant,
										group: "effects",
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
									setStyleProperty({
										component: currentComponent,
										styleType: "variant",
										styleName: currentVariant.variant,
										group: "effects",
										property: "opacity",
										value: value,
									})
								}
								width="w-24"
							/>
						</CollapsibleGroup>
					</AccordionContent>
				</AccordionItem>

				{currentComponent === "button" &&
					currentSizeStyle?.size &&
					styles.button.size && (
						<AccordionItem value="size">
							<AccordionTrigger className="font-bold text-xl">
								Size
							</AccordionTrigger>
							<AccordionContent className="flex flex-col gap-y-4 p-1">
								<div>
									<Label className="font-semibold">Size style</Label>
									<Select
										value={currentVariant.size}
										onValueChange={(value) => {
											setCurrentVariant({
												styleType: "size",
												name: value as ButtonSizeName,
											});
										}}
									>
										<SelectTrigger>
											<SelectValue placeholder="Theme" />
										</SelectTrigger>
										<SelectContent>
											{Object.keys(styles.button.size).map((sizeName) => (
												<SelectItem key={sizeName} value={sizeName}>
													{sizeName}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
								<CollapsibleGroup
									styleIsApplied={currentSizeStyle.size.isApplied}
									toggleGroupIsApplied={() => {
										toggleGroupIsApplied({
											component: currentComponent,
											styleType: "size",
											styleName: currentVariant.size,
											group: "size",
										});
									}}
									defaultOpen
									title="size"
									className="grid grid-cols-2 gap-6"
									isCollapsible={false}
									showCheckbox={false}
								>
									<GenericSliderSelector
										isDisabled={!currentSizeStyle.size.isApplied}
										label="Padding (X)"
										options={paddingXOptions}
										value={currentSizeStyle.size.properties.paddingX}
										onChange={(value) =>
											setStyleProperty({
												component: currentComponent,
												styleType: "size",
												styleName: currentVariant.size,
												group: "size",
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
											setStyleProperty({
												component: currentComponent,
												styleType: "size",
												styleName: currentVariant.size,
												group: "size",
												property: "height",
												value: value,
											})
										}
									/>
								</CollapsibleGroup>
							</AccordionContent>
						</AccordionItem>
					)}
			</Accordion>
		</div>
	);
}
