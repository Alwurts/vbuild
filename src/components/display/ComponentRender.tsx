"use client";

import { Button } from "@/components/ui/button";

import { useStyleManagerStore } from "@/store/useStyleManagerStore";
import type {
	ButtonSize,
	ButtonVariant,
	SizeStyleGroup,
	VariantStyleGroup,
} from "@/types/style";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

function ButtonComponent({
	component,
}: {
	component: {
		buttonText: string;
		variant: ButtonVariant;
		size: ButtonSize;
	};
}) {
	const extraStyles: string[] = [];
	const variantGroupNames: VariantStyleGroup[] = [
		"text",
		"background",
		"border",
		"effects",
	];
	for (const groupName of variantGroupNames) {
		if (component.variant[groupName].isApplied) {
			extraStyles.push(
				Object.values(component.variant[groupName].properties).join(" "),
			);
		}
	}

	const sizeGroupNames: SizeStyleGroup[] = ["size"];
	for (const groupName of sizeGroupNames) {
		if (component.size[groupName].isApplied) {
			extraStyles.push(
				Object.values(component.size[groupName].properties).join(" "),
			);
		}
	}

	return (
		<Button
			variant={component.variant.styleName}
			size={component.size.styleName}
			className={extraStyles.join(" ")}
		>
			{component.buttonText}
		</Button>
	);
}

export default function ComponentRender({
	openVariants,
	setOpenVariants,
}: {
	openVariants: string[];
	setOpenVariants: (value: string[]) => void;
}) {
	const { variants, buttonText } = useStyleManagerStore();

	const currentVariantStyles = variants.variant;

	const currentSizeStyles = variants.size;

	return (
		<div className="p-6 w-full max-w-[600px] flex flex-col gap-2 items-stretch overflow-x-auto">
			<Accordion
				type="multiple"
				className="w-full min-w-fit"
				value={openVariants}
				onValueChange={setOpenVariants}
			>
				{currentVariantStyles.map((styleProps, index) => (
					<AccordionItem
						value={styleProps.styleName}
						key={`variant-${styleProps.styleName}-${index}`}
						className="flex flex-col gap-2 p-2"
					>
						<AccordionTrigger>{styleProps.styleName}</AccordionTrigger>
						<AccordionContent>
							<div className="flex gap-2 pb-4">
								{currentSizeStyles.map((sizeProps) => (
									<div
										key={`variant-${styleProps.styleName}-${sizeProps.styleName}`}
										className="p-2 flex flex-col justify-between items-center gap-2"
									>
										<ButtonComponent
											component={{
												buttonText: buttonText,
												variant: styleProps,
												size: sizeProps,
											}}
										/>
										<Badge variant="outline">{sizeProps.styleName}</Badge>
									</div>
								))}
							</div>
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
}