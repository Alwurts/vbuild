import GroupContainer from "./GroupContainer";
import {
  FONT_SIZE_CLASSNAMES,
  FONT_WEIGHT_CLASSNAMES,
  TEXT_ALIGN_CLASSNAMES,
  TEXT_COLOR_CLASSNAMES,
} from "@/lib/tailwindClasses";
import { useComposerStore } from "@/store/useComposerStore";
import type { TailwindClassNamesGroups } from "@/types/tailwind/tailwind";
import { SelectList } from "@/components/settings-tools/select-list";
import { SettingLabelContainer } from "@/components/layout/SettingLabelContainer";
import { ColorPicker } from "@/components/settings-tools/color-picker";
import TextAlignToggle from "@/components/settings-tools/text-align";

export default function TextGroup({
  textGroup,
  nodeKey,
  disabled,
}: {
  textGroup: NonNullable<TailwindClassNamesGroups["text"]>;
  nodeKey: string;
  disabled?: boolean;
}) {
  const setClassNameGroup = useComposerStore(
    (state) => state.setClassNameGroup
  );

  return (
    <GroupContainer groupName="Text">
      {textGroup.textAlign && (
        <SettingLabelContainer
          htmlFor="textAlign"
          label="Alignment"
          className="grid-cols-1 gap-1 pb-1"
        >
          <TextAlignToggle
            id="textAlign"
            value={textGroup.textAlign}
            onValueChange={(value) =>
              setClassNameGroup(nodeKey, "text", {
                ...textGroup,
                textAlign: value,
              })
            }
            /* className="col-span-2" */
            disabled={disabled}
          />
        </SettingLabelContainer>
      )}
      {textGroup.textColor && (
        <SettingLabelContainer htmlFor="textColor" label="Color">
          <ColorPicker
            id="textColor"
            label="Text Color"
            value={textGroup.textColor}
            onChange={(value) =>
              setClassNameGroup(nodeKey, "text", {
                ...textGroup,
                textColor: value,
              })
            }
            isDisabled={disabled}
            className="col-span-2"
          />
        </SettingLabelContainer>
      )}
      {textGroup.fontSize && (
        <SettingLabelContainer htmlFor="fontSize" label="Size">
          <SelectList
            id="fontSize"
            value={textGroup.fontSize}
            onValueChange={(value) =>
              setClassNameGroup(nodeKey, "text", {
                ...textGroup,
                fontSize: value,
              })
            }
            options={FONT_SIZE_CLASSNAMES}
            label="Font Size"
            className="col-span-2"
            disabled={disabled}
          />
        </SettingLabelContainer>
      )}
      {textGroup.fontWeight && (
        <SettingLabelContainer htmlFor="fontWeight" label="Weight">
          <SelectList
            id="fontWeight"
            value={textGroup.fontWeight}
            onValueChange={(value) =>
              setClassNameGroup(nodeKey, "text", {
                ...textGroup,
                fontWeight: value,
              })
            }
            options={FONT_WEIGHT_CLASSNAMES}
            label="Font Weight"
            className="col-span-2"
            itemClassName={(value) => {
              return value;
            }}
            disabled={disabled}
          />
        </SettingLabelContainer>
      )}
    </GroupContainer>
  );
}
