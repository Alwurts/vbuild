import GroupContainer from "./GroupContainer";
import {
	ALIGN_ITEMS_CLASSNAMES,
	DISPLAY_CLASSNAMES,
	FLEX_DIRECTION_CLASSNAMES,
	GAP_CLASSNAMES,
	GRID_TEMPLATE_COLUMNS_CLASSNAMES,
	GRID_TEMPLATE_ROWS_CLASSNAMES,
	JUSTIFY_CONTENT_CLASSNAMES,
} from "@/lib/tailwindClasses";
import { useComposerStore } from "@/store/useComposerStore";
import {
	schemaLayoutGroup,
	type TailwindClassNamesGroups,
} from "@/types/tailwind/tailwind";
import { SelectList } from "@/components/settings-tools/select-list";
import { SettingLabelContainer } from "@/components/layout/SettingLabelContainer";
import { Registry } from "@/components/elements/Registry";
import type { TGenericComponentsAbstract } from "@/types/elements/jsx";
import DisplayToggle from "@/components/settings-tools/display-toggle";
import FlexDirectionToggle from "@/components/settings-tools/flex-direction-toggle";
import { defaultLayoutGroups } from "@/lib/tailwind/tailwind";

export default function LayoutGroup({
	layoutGroup,
	node,
}: {
	layoutGroup: NonNullable<TailwindClassNamesGroups["layout"]>;
	node: TGenericComponentsAbstract;
}) {
	const setClassNameGroup = useComposerStore(
		(state) => state.setClassNameGroup,
	);
	return (
		<GroupContainer groupName="Layout">
			{layoutGroup.display && (
				<SettingLabelContainer
					htmlFor="display"
					label="Type"
					className="grid-cols-1 gap-1 pb-1"
				>
					<DisplayToggle
						id="display"
						value={layoutGroup.display}
						onValueChange={(newValue) => {
							const defaultLayoutGroup =
								defaultLayoutGroups[
									newValue as keyof typeof defaultLayoutGroups
								];
							const parsedLayoutGroup = schemaLayoutGroup.parse({
								...defaultLayoutGroup,
								...layoutGroup,
								display: newValue,
							});
							setClassNameGroup(node.key, "layout", parsedLayoutGroup);
						}}
					/>
				</SettingLabelContainer>
			)}
			{layoutGroup.display === "flex" && (
				<>
					{layoutGroup.flexDirection && (
						<SettingLabelContainer htmlFor="flexDirection" label="Direction">
							<FlexDirectionToggle
								id="flexDirection"
								value={layoutGroup.flexDirection}
								onValueChange={(value) =>
									setClassNameGroup(node.key, "layout", {
										...layoutGroup,
										flexDirection: value,
									})
								}
							/>
						</SettingLabelContainer>
					)}
					{layoutGroup.justifyContent && (
						<SettingLabelContainer htmlFor="justifyContent" label="Justify">
							<SelectList
								id="justifyContent"
								value={layoutGroup.justifyContent}
								onValueChange={(value) =>
									setClassNameGroup(node.key, "layout", {
										...layoutGroup,
										justifyContent: value,
									})
								}
								options={JUSTIFY_CONTENT_CLASSNAMES}
								label="Justify"
								className="col-span-2"
							/>
						</SettingLabelContainer>
					)}
					{layoutGroup.alignItems && (
						<SettingLabelContainer htmlFor="alignItems" label="Align">
							<SelectList
								id="alignItems"
								value={layoutGroup.alignItems}
								onValueChange={(value) =>
									setClassNameGroup(node.key, "layout", {
										...layoutGroup,
										alignItems: value,
									})
								}
								options={ALIGN_ITEMS_CLASSNAMES}
								label="Align"
								className="col-span-2"
							/>
						</SettingLabelContainer>
					)}
				</>
			)}
			{layoutGroup.display === "grid" && (
				<>
					{layoutGroup.gridTemplateColumns && (
						<SettingLabelContainer
							htmlFor="gridTemplateColumns"
							label="Columns"
						>
							<SelectList
								id="gridTemplateColumns"
								value={layoutGroup.gridTemplateColumns}
								onValueChange={(value) =>
									setClassNameGroup(node.key, "layout", {
										...layoutGroup,
										gridTemplateColumns: value,
									})
								}
								options={GRID_TEMPLATE_COLUMNS_CLASSNAMES}
								label="Columns"
								className="col-span-2"
							/>
						</SettingLabelContainer>
					)}
					{layoutGroup.gridTemplateRows && (
						<SettingLabelContainer htmlFor="gridTemplateRows" label="Rows">
							<SelectList
								id="gridTemplateRows"
								value={layoutGroup.gridTemplateRows}
								onValueChange={(value) =>
									setClassNameGroup(node.key, "layout", {
										...layoutGroup,
										gridTemplateRows: value,
									})
								}
								options={GRID_TEMPLATE_ROWS_CLASSNAMES}
								label="Rows"
								className="col-span-2"
							/>
						</SettingLabelContainer>
					)}
				</>
			)}
			{layoutGroup.display !== "hidden" &&
				layoutGroup.display !== "block" &&
				layoutGroup.gap && (
					<SettingLabelContainer htmlFor="gap" label="Gap">
						<SelectList
							id="gap"
							value={layoutGroup.gap}
							onValueChange={(value) =>
								setClassNameGroup(node.key, "layout", {
									...layoutGroup,
									gap: value,
								})
							}
							options={GAP_CLASSNAMES}
							label="Gap"
							className="col-span-2"
						/>
					</SettingLabelContainer>
				)}
		</GroupContainer>
	);
}
