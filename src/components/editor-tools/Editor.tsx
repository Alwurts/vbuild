import {
	fontSizesOptions,
	paddingXOptions,
	heightOptions,
	roundedOptions,
	opacityOptions,
} from "@/lib/tailwindClasses";
import type { ButtonSizeName, ButtonVariantName } from "@/types/style";
import { CollapsibleGroup } from "@/components/layout/CollapsibleGroup";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { BorderType } from "@/components/editor-tools/BorderType";
import { BorderWidth } from "@/components/editor-tools/BorderWidth";
import { ColorPicker } from "@/components/editor-tools/ColorPicker";
import { GenericSliderSelector } from "@/components/editor-tools/GenericSliderSelector";
import { FontWeight } from "@/components/editor-tools/FontWeight";
import { InputTool } from "@/components/editor-tools/InputTool";
import { Shadow } from "@/components/editor-tools/Shadow";
import { useStyleManagerStore } from "@/store/useStyleManagerStore";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../ui/accordion";

export function Editor({
	openVariants,
	setOpenVariants,
}: { openVariants: string[]; setOpenVariants: (value: string[]) => void }) {
	const {
		buttonText,
		setButtonText,
		variants,
		currentVariant,
		setCurrentVariant,
		setGroupStyleProperty,
		toggleGroupIsApplied,
	} = useStyleManagerStore();

	const currentVariantStyle = variants.variant.find(
		(style) => style.styleName === currentVariant.variant,
	);

	const currentSizeStyle = variants.size.find(
		(style) => style.styleName === currentVariant.size,
	);

	if (!currentVariantStyle || !currentSizeStyle) {
		return null;
	}
	return (
		<div className="space-y-3">
			<Accordion type="multiple" defaultValue={["variant", "size"]}>
				<AccordionItem value="size">
					<AccordionTrigger className="font-bold text-xl">Size</AccordionTrigger>
					<AccordionContent className="flex flex-col gap-y-4">
						<div>
							<Label className="font-semibold">Size style</Label>
							<Select
								value={currentVariant.size}
								onValueChange={(value) => {
									setCurrentVariant({
										variantType: "size",
										name: value as ButtonSizeName,
									});
								}}
							>
								<SelectTrigger>
									<SelectValue placeholder="Theme" />
								</SelectTrigger>
								<SelectContent>
									{variants.size.map((style) => (
										<SelectItem key={style.styleName} value={style.styleName}>
											{style.styleName}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
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
              isCollapsible={false}
              showCheckbox={false}
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
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="variant">
					<AccordionTrigger className="font-bold text-xl">Variant</AccordionTrigger>
					<AccordionContent className="flex flex-col gap-y-4">
						<div>
							<Label className="font-semibold">Variant style</Label>
							<Select
								value={currentVariant.variant}
								onValueChange={(value) => {
									setCurrentVariant({
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
							<FontWeight
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
								borderStyle={currentVariantStyle.border.properties.borderStyle}
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
								borderWidth={currentVariantStyle.border.properties.borderWidth}
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
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
}
