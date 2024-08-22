import GroupContainer from "./GroupContainer";
import { HEIGHT_CLASSNAMES, WIDTH_CLASSNAMES } from "@/lib/tailwindClasses";
import { useComposerStore } from "@/store/useComposerStore";
import type { TailwindClassNamesGroups } from "@/types/tailwind/tailwind";
import { SelectList } from "@/components/ui-editor/select-list";

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
        <>
          <h5 className="mt-2">Width</h5>
          <SelectList
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
        </>
      )}
      {sizeGroup.height && (
        <>
          <h5 className="mt-2">Height</h5>
          <SelectList
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
        </>
      )}
    </GroupContainer>
  );
}
