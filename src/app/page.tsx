"use client";

import { useState } from "react";
import { Card } from "@/components/ui-editor/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui-editor/tabs";
import { CodeDisplay } from "@/components/code/CodeDisplay";
import { Editor } from "@/components/editor-tools/Editor";
import ComponentRender from "@/components/display/ComponentRender";

import { useStyleManagerStore } from "@/store/useStyleManagerStore";

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
