import { cloneElement, Fragment, isValidElement } from "react";
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "../ui-editor/command";
import type { GenericComponentName } from "@/types/elements/elements";
import { Registry } from "../elements/Registry";
import { useComposerStore } from "@/store/useComposerStore";

export function AddElementsDialog() {
	const childrenMenuKey = useComposerStore((state) => state.childrenMenuKey);
	const setChildrenMenuKey = useComposerStore(
		(state) => state.setChildrenMenuKey,
	);
	const addElementAsChild = useComposerStore(
		(state) => state.addElementAsChild,
	);

	const availableComponents: {
		[key: string]: GenericComponentName[];
	} = {
		Basic: ["div"],
		Text: ["h1", "h2", "h3", "h4", "p"],
		Actions: ["Button"],
		Card: [
			"Card",
			"CardContent",
			"CardHeader",
			"CardFooter",
			"CardTitle",
			"CardDescription",
		],
	};

	const handleAddElement = (component: GenericComponentName) => {
		if (childrenMenuKey) {
			addElementAsChild(childrenMenuKey, component);
			setChildrenMenuKey(null);
		}
	};

	return (
		<CommandDialog
			open={!!childrenMenuKey}
			onOpenChange={(open) => setChildrenMenuKey(open ? childrenMenuKey : null)}
		>
			<CommandInput placeholder="Search for elements..." />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				{Object.entries(availableComponents).map(([category, components]) => (
					<Fragment key={category}>
						<CommandGroup heading={category}>
							{components.map((component) => {
								const componentConfig = Registry[component];
								const nodeIcon = componentConfig.icon;
								return (
									<CommandItem
										key={component}
										onSelect={() => handleAddElement(component)}
									>
										{nodeIcon &&
											isValidElement(nodeIcon) &&
											cloneElement(nodeIcon as React.ReactElement, {
												className: "w-4 h-4 mr-2",
											})}
										<span>{component}</span>
									</CommandItem>
								);
							})}
						</CommandGroup>
						<CommandSeparator />
					</Fragment>
				))}
			</CommandList>
		</CommandDialog>
	);
}
