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
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui-editor/toggle-group";
import {
  AlignCenterHorizontal,
  AlignEndHorizontal,
  AlignStartHorizontal,
  Grid2X2,
  Maximize,
  MoveHorizontal,
  MoveVertical,
  Rows2,
  Square,
} from "lucide-react";
import { cloneElement, isValidElement } from "react";
import {
  GAP_CLASSNAMES,
  PADDING_CLASSNAMES,
  WIDTH_CLASSNAMES,
} from "@/lib/tailwindClasses";
import { cn } from "@/lib/utils";
import { useComposerStore } from "@/store/useComposerStore";
import type { TGenericComponentsAbstract } from "@/types/elements/jsx";

export default function LayoutGroup({
  node,
}: {
  node: TGenericComponentsAbstract;
}) {
  if (!node.className.Layout) return null;
  const { Padding, Display, Direction, Justify, Align, Gap } =
    node.className.Layout;
  return (
    <GroupContainer groupName="Layout">
      {Display && (
        <>
          <h5 className="mt-2">Type</h5>
          <DisplayControl
            className="col-span-2"
            value={Display}
            nodeKey={node.key}
          />
        </>
      )}
      {Display === "flex" && Direction && (
        <>
          <h5 className="mt-2">Direction</h5>
          <DirectionControl
            className="col-span-2"
            value={Direction}
            nodeKey={node.key}
          />
        </>
      )}
      {Display === "flex" && Justify && (
        <>
          <h5 className="mt-2">Justify</h5>
          <JustifyControl
            className="col-span-2"
            value={Justify}
            nodeKey={node.key}
          />
        </>
      )}
      {Display === "flex" && Align && (
        <>
          <h5 className="mt-2">Align</h5>
          <AlignControl
            className="col-span-2"
            value={Align}
            nodeKey={node.key}
          />
        </>
      )}
      {Display === "flex" && Gap && (
        <>
          <h5 className="mt-2">Gap</h5>
          <GapControl className="col-span-2" value={Gap} nodeKey={node.key} />
        </>
      )}
      {Padding && (
        <>
          <h5 className="mt-2">Padding</h5>
          <PaddingControl
            nodeKey={node.key}
            value={Padding}
            className="col-span-2"
          />
        </>
      )}
    </GroupContainer>
  );
}

function DisplayControl({
  className,
  value,
  nodeKey,
}: {
  className?: string;
  value: string;
  nodeKey: string;
}) {
  const setNodeClassName = useComposerStore((state) => state.setNodeClassName);
  const displayOptions = [
    { label: "Flex", value: "flex", icon: <Rows2 /> },
    { label: "Grid", value: "grid", icon: <Grid2X2 /> },
  ];
  return (
    <ToggleGroup
      type="single"
      variant="outline"
      size="sm"
      className={className}
      value={value}
      onValueChange={(value) =>
        setNodeClassName(nodeKey, "Layout", "Display", value)
      }
    >
      {displayOptions.map(({ label, value, icon }) => (
        <ToggleGroupItem
          key={value}
          value={value}
          aria-label={label}
          className="w-full"
        >
          {icon &&
            isValidElement(icon) &&
            cloneElement(icon as React.ReactElement, {
              className: "w-4 h-4 mr-1",
            })}
          <span>{label}</span>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

function DirectionControl({
  className,
  value,
  nodeKey,
}: {
  className?: string;
  value: string;
  nodeKey: string;
}) {
  const setNodeClassName = useComposerStore((state) => state.setNodeClassName);
  const directionOptions = [
    { label: "Row", value: "flex-row", icon: <MoveHorizontal /> },
    { label: "Column", value: "flex-col", icon: <MoveVertical /> },
  ];
  return (
    <ToggleGroup
      type="single"
      variant="outline"
      size="sm"
      className={className}
      value={value}
      onValueChange={(value) =>
        setNodeClassName(nodeKey, "Layout", "Direction", value)
      }
    >
      {directionOptions.map(({ label, value, icon }) => (
        <ToggleGroupItem
          key={value}
          value={value}
          aria-label={label}
          title={label}
          className="w-full"
        >
          {icon &&
            isValidElement(icon) &&
            cloneElement(icon as React.ReactElement, {
              className: "w-4 h-4 mr-1",
            })}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

function JustifyControl({
  className,
  value,
  nodeKey,
}: {
  className?: string;
  value: string;
  nodeKey: string;
}) {
  const setNodeClassName = useComposerStore((state) => state.setNodeClassName);
  const justifyOptions = [
    "justify-normal",
    "justify-start",
    "justify-end",
    "justify-center",
    "justify-between",
    "justify-around",
    "justify-evenly",
    "justify-stretch",
    "justify-baseline",
  ];
  return (
    <Select
      value={value}
      onValueChange={(value) =>
        setNodeClassName(nodeKey, "Layout", "Justify", value)
      }
    >
      <SelectTrigger className={cn("h-9", className)}>
        <SelectValue placeholder="None" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Width</SelectLabel>
          {justifyOptions.map((option) => (
            <SelectItem value={option} key={option}>
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

function AlignControl({
  className,
  value,
  nodeKey,
}: {
  className?: string;
  value: string;
  nodeKey: string;
}) {
  const setNodeClassName = useComposerStore((state) => state.setNodeClassName);
  const alignOptions = [
    { label: "Start", value: "items-start", icon: <AlignStartHorizontal /> },
    { label: "Center", value: "items-center", icon: <AlignCenterHorizontal /> },
    { label: "End", value: "items-end", icon: <AlignEndHorizontal /> },
  ];
  return (
    <ToggleGroup
      type="single"
      variant="outline"
      size="sm"
      className={className}
      value={value}
      onValueChange={(value) =>
        setNodeClassName(nodeKey, "Layout", "Align", value)
      }
    >
      {alignOptions.map(({ label, value, icon }) => (
        <ToggleGroupItem
          key={value}
          value={value}
          aria-label={label}
          title={label}
          className="w-full"
        >
          {icon &&
            isValidElement(icon) &&
            cloneElement(icon as React.ReactElement, {
              className: "w-4 h-4",
            })}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

function GapControl({
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
      onValueChange={(value) =>
        setNodeClassName(nodeKey, "Layout", "Gap", value)
      }
    >
      <SelectTrigger className={cn("h-9", className)}>
        <SelectValue placeholder="None" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Gap</SelectLabel>
          {GAP_CLASSNAMES.map((option) => (
            <SelectItem value={option} key={option}>
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

function PaddingControl({
  className,
  nodeKey,
  value,
}: {
  className?: string;
  nodeKey: string;
  value: string;
}) {
  const setNodeClassName = useComposerStore((state) => state.setNodeClassName);
  return (
    <div className={cn("flex flex-col items-stretch gap-2", className)}>
      <Select
        value={value}
        onValueChange={(value) =>
          setNodeClassName(nodeKey, "Layout", "Padding", value)
        }
      >
        <SelectTrigger className="h-9">
          <SelectValue placeholder="None" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Padding</SelectLabel>
            {PADDING_CLASSNAMES.map((option) => (
              <SelectItem value={option} key={option}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {/* <ToggleGroup
        type="single"
        variant="outline"
        size="sm"
        className={className}
      >
        <ToggleGroupItem title="All" className="w-full" value="all">
          <Square className="w-4 h-4" />
        </ToggleGroupItem>
        <ToggleGroupItem title="Separate" className="w-full" value="separate">
          <Maximize className="w-4 h-4" />
        </ToggleGroupItem>
      </ToggleGroup> */}
    </div>
  );
}
