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
import ComponentRender from "@/components/display/ComponentRender";
import { Editor } from "@/components/editor-tools/Editor";

export default function Home() {
	const { currentVariant } = useStyleManagerStore();

	const [openVariants, setOpenVariants] = useState<string[]>([
		currentVariant.variant,
	]);

	return (
		<div className="w-full h-screen flex justify-center items-center p-6 bg-stone-300">
			<Card className="w-full max-w-7xl h-full flex gap-6">
				<ComponentRender
					openVariants={openVariants}
					setOpenVariants={setOpenVariants}
				/>
				<div className="p-6 border-l border-border flex-1 space-y-6 overflow-y-auto">
					<Tabs defaultValue="toggles">
						<TabsList className="grid w-full grid-cols-2">
							<TabsTrigger value="toggles">Editor</TabsTrigger>
							<TabsTrigger value="code">Code</TabsTrigger>
						</TabsList>
						<TabsContent value="toggles">
							<Editor
								openVariants={openVariants}
								setOpenVariants={setOpenVariants}
							/>
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
