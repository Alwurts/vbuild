"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

import { useStyleManagerStore } from "@/store/useStyleManagerStore";
import type { ButtonSize, ButtonVariant } from "@/types/style";

function AccordionComponent({
	component,
}: {
	component:
		| { type: "size"; buttonText: string; style: ButtonSize }
		| { type: "variant"; buttonText: string; style: ButtonVariant };
}) {
	const parseStyleAttributes: string[] = [];
	const addStyleAttribute = (style: string | boolean) => {
		if (typeof style === "string") {
			parseStyleAttributes.push(style);
		}
	};
	if (component.type === "size") {
		addStyleAttribute(
			component.style.size.isApplied && component.style.size.properties.height,
			);
			addStyleAttribute(
				component.style.size.isApplied &&
				component.style.size.properties.paddingX,
				);
				}
	if (component.type === "variant") {
		const styleNameTyped = component.style.styleName;
		addStyleAttribute(
			component.style.text.isApplied &&
				component.style.text.properties.textColor,
		);
		addStyleAttribute(
			component.style.text.isApplied &&
				component.style.text.properties.fontSize,
		);
		addStyleAttribute(
			component.style.text.isApplied &&
				component.style.text.properties.fontWeight,
		);
		addStyleAttribute(
			component.style.background.isApplied &&
				component.style.background.properties.bgColor,
		);
		addStyleAttribute(
			component.style.border.isApplied &&
				component.style.border.properties.borderColor,
		);
		addStyleAttribute(
			component.style.border.isApplied &&
				component.style.border.properties.borderWidth,
		);
		addStyleAttribute(
			component.style.border.isApplied &&
				component.style.border.properties.borderStyle,
		);
		addStyleAttribute(
			component.style.border.isApplied &&
				component.style.border.properties.rounded,
		);
		addStyleAttribute(
			component.style.effects.isApplied &&
				component.style.effects.properties.shadow,
		);
		addStyleAttribute(
			component.style.effects.isApplied &&
				component.style.effects.properties.opacity,
		);
		return (
			<AccordionItem value={styleNameTyped} key={styleNameTyped}>
				<AccordionTrigger>{styleNameTyped}</AccordionTrigger>
				<AccordionContent>
					<div className="flex items-center space-x-2 pt-2">
						<Button
							variant={
								component.type === "variant" ? styleNameTyped : undefined
							}
							className={parseStyleAttributes.join(" ")}
						>
							{component.buttonText}
						</Button>
						<span className="text-sm text-gray-500">{styleNameTyped}</span>
					</div>
				</AccordionContent>
			</AccordionItem>
		);
	}
}

export default function ComponentRender({
	openStyles,
	setOpenStyles,
}: { openStyles: string[]; setOpenStyles: (value: string[]) => void }) {
	const { variants, currentVariant, buttonText } = useStyleManagerStore();

	const currentVariantStyles = variants.variant;

	const currentSizeStyles = variants.size;

	return (
		<div className="p-6 w-[500px] overflow-y-auto">
			<Accordion
				value={openStyles}
				onValueChange={setOpenStyles}
				type="multiple"
				className="w-full"
			>
				{currentVariantStyles.map((styleProps) => (
					<AccordionComponent
						key={`variant-${styleProps.styleName}`}
						component={{
							type: "variant",
							buttonText: styleProps.styleName,
							style: styleProps,
						}}
					/>
				))}
			</Accordion>
		</div>
	);
}
