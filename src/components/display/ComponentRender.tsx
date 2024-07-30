"use client";

import { Button } from "@/components/ui/button";

import { useStyleManagerStore } from "@/store/useStyleManagerStore";

import { Badge } from "@/components/ui/badge";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import type { ButtonSizeName, ButtonVariantName } from "@/types/button";

function ButtonComponent({
	component,
}: {
	component: {
		componentText: string;
		variant: ButtonVariantName;
		size: ButtonSizeName;
	};
}) {
	const { styles } = useStyleManagerStore();
	const variantStyle = styles.variant[component.variant];
	const sizeStyle = styles.size[component.size];

	const extraStyles = Object.entries(variantStyle)
		.filter(([_, group]) => group.isApplied)
		.flatMap(([_, group]) => Object.values(group.properties))
		.concat(
			Object.entries(sizeStyle)
				.filter(([_, group]) => group.isApplied)
				.flatMap(([_, group]) => Object.values(group.properties)),
		);

	return (
		<Button
			variant={component.variant}
			size={component.size}
			className={extraStyles.join(" ")}
		>
			{component.componentText}
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
	const { styles, componentText } = useStyleManagerStore();

	return (
		<div className="p-6 w-full max-w-[600px] flex flex-col gap-2 items-stretch overflow-x-auto">
			<Accordion
				type="multiple"
				className="w-full min-w-fit"
				value={openVariants}
				onValueChange={setOpenVariants}
			>
				{Object.entries(styles.variant).map(([variantName, variantStyle]) => (
					<AccordionItem
						value={variantName}
						key={`variant-${variantName}`}
						className="flex flex-col gap-2 p-2"
					>
						<AccordionTrigger>{variantName}</AccordionTrigger>
						<AccordionContent>
							<div className="flex gap-2 pb-4">
								{Object.keys(styles.size).map((sizeName) => (
									<div
										key={`variant-${variantName}-${sizeName}`}
										className="p-2 flex flex-col justify-between items-center gap-2"
									>
										<ButtonComponent
											component={{
												componentText,
												variant: variantName as ButtonVariantName,
												size: sizeName as ButtonSizeName,
											}}
										/>
										<Badge variant="outline">{sizeName}</Badge>
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
