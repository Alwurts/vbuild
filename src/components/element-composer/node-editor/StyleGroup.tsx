import GroupContainer from "./GroupContainer";
import { BACKGROUND_COLOR_CLASSNAMES } from "@/lib/tailwindClasses";
import { useComposerStore } from "@/store/useComposerStore";
import type { TailwindClassNamesGroups } from "@/types/tailwind/tailwind";
import { SettingLabelContainer } from "@/components/layout/SettingLabelContainer";
import { ColorPicker } from "@/components/settings-tools/color-picker";

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
    (state) => state.setClassNameGroup
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
    </GroupContainer>
  );
}
