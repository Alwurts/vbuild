import GroupContainer from "./GroupContainer";
import { BORDER_RADIUS_CLASSNAMES } from "@/lib/tailwind/tailwindClasses/index";
import { useComposerStore } from "@/store/useComposerStore";
import type { TailwindClassNamesGroups } from "@/types/tailwind/tailwind";
import { SettingLabelContainer } from "@/components/layout/SettingLabelContainer";
import { ColorPicker } from "@/components/settings-tools/color-picker";
import { SelectList } from "@/components/settings-tools/select-list";

export default function StyleGroup({
	styleGroup,
	nodeKey,
	disabled,
}: {
	styleGroup: NonNullable<TailwindClassNamesGroups["style"]>;
	nodeKey: string;
	disabled?: boolean;
}) {
	const setClassNameGroup = useComposerStore(
		(state) => state.setClassNameGroup,
	);

	return (
		<GroupContainer groupName="Style">
			{styleGroup.backgroundColor && (
				<SettingLabelContainer label="Background" htmlFor="backgroundColor">
					<ColorPicker
						id="backgroundColor"
						label="Background Color"
						value={styleGroup.backgroundColor}
						onChange={(value) =>
							setClassNameGroup(nodeKey, "style", {
								...styleGroup,
								backgroundColor: value,
							})
						}
						isDisabled={disabled}
						className="col-span-2"
					/>
				</SettingLabelContainer>
			)}
			{styleGroup.borderRadius && (
				<SettingLabelContainer htmlFor="borderRadius" label="Border Radius">
					<SelectList
						id="borderRadius"
						value={styleGroup.borderRadius}
						onValueChange={(value) =>
							setClassNameGroup(nodeKey, "style", {
								...styleGroup,
								borderRadius: value,
							})
						}
						options={BORDER_RADIUS_CLASSNAMES}
						label="Border Radius"
						className="col-span-2"
						disabled={disabled}
					/>
				</SettingLabelContainer>
			)}
		</GroupContainer>
	);
}
