import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui-editor/select";
import GroupContainer from "./GroupContainer";
import { HEIGHT_OPTIONS, WIDTH_CLASSNAMES } from "@/lib/tailwindClasses";
import { cn } from "@/lib/utils";
import { useComposerStore } from "@/store/useComposerStore";
import type { tailwindClassNamesGroups } from "@/types/tailwind/tailwind";
import { SelectList } from "@/components/ui-editor/select-list";

export default function SizeGroup({
  sizeGroup,
  nodeKey,
  disabled,
}: {
  sizeGroup: NonNullable<tailwindClassNamesGroups["size"]>;
  nodeKey: string;
  disabled?: boolean;
}) {
  const setNodeClassName = useComposerStore((state) => state.setNodeClassName);

  return (
    <GroupContainer groupName="Size">
      {sizeGroup.width && (
        <>
          <h5 className="mt-2">Width</h5>
          <SelectList
            value={sizeGroup.width}
            onValueChange={(value) => setNodeClassName(nodeKey, "width", value)}
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
              setNodeClassName(nodeKey, "height", value)
            }
            options={HEIGHT_OPTIONS}
            label="Height"
            className="col-span-2"
            disabled={disabled}
          />
        </>
      )}
    </GroupContainer>
  );
}
