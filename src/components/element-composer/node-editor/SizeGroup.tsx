import GroupContainer from "./GroupContainer";
import { HEIGHT_CLASSNAMES, WIDTH_CLASSNAMES } from "@/lib/tailwindClasses";
import { useComposerStore } from "@/store/useComposerStore";
import type { TailwindClassNamesGroups } from "@/types/tailwind/tailwind";
import { SelectList } from "@/components/settings-tools/select-list";
import { SettingLabelContainer } from "@/components/layout/SettingLabelContainer";

export default function SizeGroup({
  sizeGroup,
  nodeKey,
  disabled,
}: {
  sizeGroup: NonNullable<TailwindClassNamesGroups["size"]>;
  nodeKey: string;
  disabled?: boolean;
}) {
  const setClassNameGroup = useComposerStore(
    (state) => state.setClassNameGroup
  );

  return (
    <GroupContainer groupName="Size">
      {sizeGroup.width && (
        <SettingLabelContainer htmlFor="width" label="Width">
          <SelectList
            id="width"
            value={sizeGroup.width}
            onValueChange={(value) =>
              setClassNameGroup(nodeKey, "size", {
                ...sizeGroup,
                width: value,
              })
            }
            options={WIDTH_CLASSNAMES}
            label="Width"
            className="col-span-2"
            disabled={disabled}
          />
        </SettingLabelContainer>
      )}
      {sizeGroup.height && (
        <SettingLabelContainer htmlFor="height" label="Height">
          <SelectList
            id="height"
            value={sizeGroup.height}
            onValueChange={(value) =>
              setClassNameGroup(nodeKey, "size", {
                ...sizeGroup,
                height: value,
              })
            }
            options={HEIGHT_CLASSNAMES}
            label="Height"
            className="col-span-2"
            disabled={disabled}
          />
        </SettingLabelContainer>
      )}
    </GroupContainer>
  );
}
