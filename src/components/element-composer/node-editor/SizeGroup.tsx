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
import type { TGenericComponentsAbstract } from "@/types/elements/jsx";
import { useComposerStore } from "@/store/useComposerStore";

export default function SizeGroup({
  node,
}: {
  node: TGenericComponentsAbstract;
}) {
  return (
    <GroupContainer groupName="Size">
      {node.className.width && (
        <>
          <h5 className="mt-2">Width</h5>
          <WidthControl
            value={node.className.width}
            nodeKey={node.key}
            className="col-span-2"
          />
        </>
      )}
      {node.className.height && (
        <>
          <h5 className="mt-2">Height</h5>
          <HeightControl
            value={node.className.height}
            nodeKey={node.key}
            className="col-span-2"
          />
        </>
      )}
    </GroupContainer>
  );
}

function WidthControl({
  className,
  value,
  nodeKey,
}: {
  className?: string;
  value: string;
  nodeKey: string;
}) {
  const setNodeClassName = useComposerStore((state) => state.setNodeClassName);
  return (
    <Select
      value={value}
      onValueChange={(value) => setNodeClassName(nodeKey, "width", value)}
    >
      <SelectTrigger className={cn("h-9", className)}>
        <SelectValue placeholder="None" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Width</SelectLabel>
          {WIDTH_CLASSNAMES.map((option) => (
            <SelectItem value={option} key={option}>
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

function HeightControl({
  className,
  value,
  nodeKey,
}: {
  className?: string;
  value: string | undefined;
  nodeKey: string;
}) {
  const setNodeClassName = useComposerStore((state) => state.setNodeClassName);
  return (
    <Select
      value={value}
      onValueChange={(value) => setNodeClassName(nodeKey, "height", value)}
    >
      <SelectTrigger className={cn("h-9", className)}>
        <SelectValue placeholder="None" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Height</SelectLabel>
          {HEIGHT_OPTIONS.map((option) => (
            <SelectItem value={option} key={option}>
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
