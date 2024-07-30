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
import { Button, buttonVariants } from "@/components/ui-editor/button";
import { GithubIcon, StarIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
	const [openVariants, setOpenVariants] = useState<
		(ButtonVariantName & BadgeVariantName)[]
	>(["default", "destructive", "outline", "secondary"]);

	return (
		<div className="w-full h-screen flex flex-col gap-2 justify-center items-center p-10 bg-stone-300">
			<div className="flex justify-between items-center gap-2 w-full max-w-7xl px-4">
				<div className="flex justify-start items-baseline gap-2">
					<h1 className="text-2xl font-bold">shadcn/ui Editor</h1>
					<p className="text-sm text-gray-500">
						Quickly customize shadcn/ui components
					</p>
				</div>
				<div className="">
					<Link
						href="https://github.com/Alwurts/shadcn-editor"
						target="_blank"
						className={buttonVariants({
							variant: "outline",
							size: "sm",
							className: "flex items-center gap-2",
						})}
					>
						View on Github
						<StarIcon className="w-4 h-4" />
					</Link>
				</div>
			</div>
			<Card className="w-full max-w-7xl h-full flex gap-6">
				<ComponentRender
					openVariants={openVariants}
					setOpenVariants={setOpenVariants}
				/>
				<div className="p-6 border-l border-border flex-1 space-y-6 overflow-y-auto">
					<Tabs defaultValue="toggles">
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
