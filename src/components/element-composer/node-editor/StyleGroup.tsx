import GroupContainer from "./GroupContainer";
import {
  BACKGROUND_COLOR_CLASSNAMES,
  FONT_SIZE_CLASSNAMES,
  FONT_WEIGHT_CLASSNAMES,
  TEXT_ALIGN_CLASSNAMES,
  TEXT_COLOR_CLASSNAMES,
} from "@/lib/tailwindClasses";
import { useComposerStore } from "@/store/useComposerStore";
import type { TailwindClassNamesGroups } from "@/types/tailwind/tailwind";
import { SelectList } from "@/components/ui-editor/select-list";
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
    <GroupContainer groupName="Text">
      {styleGroup.backgroundColor && (
        <>
          <h5 className="mt-2">Background Color</h5>
          <SelectList
            value={styleGroup.backgroundColor}
            onValueChange={(value) =>
              setClassNameGroup(nodeKey, "style", {
                ...styleGroup,
                backgroundColor: value,
              })
            }
            options={BACKGROUND_COLOR_CLASSNAMES}
            label="Background Color"
            className="col-span-2"
            disabled={disabled}
          />
        </>
      )}
    </GroupContainer>
  );
}
