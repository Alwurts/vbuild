"use client";

import { useState } from "react";
import { Card } from "@/components/ui-editor/card";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui-editor/tabs";
import { CodeDisplay } from "@/components/code/CodeDisplay";
import { Editor } from "@/components/editor-tools/Editor";
import { CSSVariablesEditor } from "@/components/editor-tools/CSSVariablesEditor";
import ComponentRender from "@/components/display/ComponentRender";

import { useStyleManagerStore } from "@/store/useStyleManagerStore";
import type { ButtonVariantName } from "@/types/button";
import type { BadgeVariantName } from "@/types/badge";

export default function Home() {
	const [openVariants, setOpenVariants] = useState<
		(ButtonVariantName & BadgeVariantName)[]
	>(["default", "destructive", "outline", "secondary"]);

	return (
		<div className="w-full h-screen flex justify-center items-center p-6 bg-stone-300">
			<Card className="w-full max-w-7xl h-full flex gap-6">
				<ComponentRender
					openVariants={openVariants}
					setOpenVariants={setOpenVariants}
				/>
				<div className="p-6 border-l border-border flex-1 space-y-6 overflow-y-auto">
					<Tabs defaultValue="css-variables">
						<TabsList className="grid w-full grid-cols-2">
							<TabsTrigger value="css-variables">CSS Variables</TabsTrigger>
							<TabsTrigger value="toggles">Editor</TabsTrigger>
						</TabsList>
						<TabsContent value="css-variables">
							<CSSVariablesEditor />
						</TabsContent>
						<TabsContent value="toggles">
							<Editor
								openVariants={openVariants}
								setOpenVariants={setOpenVariants}
							/>
						</TabsContent>
					</Tabs>
				</div>
			</Card>
		</div>
	);
}
