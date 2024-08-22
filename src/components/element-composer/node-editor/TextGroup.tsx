import GroupContainer from "./GroupContainer";
import {
  FONT_SIZE_CLASSNAMES,
  FONT_WEIGHT_CLASSNAMES,
  TEXT_ALIGN_CLASSNAMES,
  TEXT_COLOR_CLASSNAMES,
} from "@/lib/tailwindClasses";
import { useComposerStore } from "@/store/useComposerStore";
import type { TailwindClassNamesGroups } from "@/types/tailwind/tailwind";
import { SelectList } from "@/components/ui-editor/select-list";

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
        <>
          <h5 className="mt-2">Text Align</h5>
          <SelectList
            value={textGroup.textAlign}
            onValueChange={(value) =>
              setClassNameGroup(nodeKey, "text", {
                ...textGroup,
                textAlign: value,
              })
            }
            options={TEXT_ALIGN_CLASSNAMES}
            label="Text Align"
            className="col-span-2"
            disabled={disabled}
          />
        </>
      )}
      {textGroup.textColor && (
        <>
          <h5 className="mt-2">Text Color</h5>
          <SelectList
            value={textGroup.textColor}
            onValueChange={(value) =>
              setClassNameGroup(nodeKey, "text", {
                ...textGroup,
                textColor: value,
              })
            }
            options={TEXT_COLOR_CLASSNAMES}
            label="Text Color"
            className="col-span-2"
            disabled={disabled}
          />
        </>
      )}
      {textGroup.fontSize && (
        <>
          <h5 className="mt-2">Font Size</h5>
          <SelectList
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
        </>
      )}
      {textGroup.fontWeight && (
        <>
          <h5 className="mt-2">Font Weight</h5>
          <SelectList
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
            disabled={disabled}
          />
        </>
      )}
    </GroupContainer>
  );
}
