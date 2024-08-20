import GroupContainer from "./GroupContainer";
import {
  ALIGN_ITEMS_OPTIONS,
  DISPLAY_OPTIONS,
  FLEX_DIRECTION_OPTIONS,
  GAP_CLASSNAMES,
  GRID_TEMPLATE_COLUMNS_OPTIONS,
  GRID_TEMPLATE_ROWS_OPTIONS,
  JUSTIFY_CONTENT_OPTIONS,
  MARGIN_CLASSNAMES,
  PADDING_CLASSNAMES,
} from "@/lib/tailwindClasses";
import { useComposerStore } from "@/store/useComposerStore";
import type { tailwindClassNamesGroups } from "@/types/tailwind/tailwind";
import { SelectList } from "@/components/ui-editor/select-list";
import { SettingLabelContainer } from "@/components/layout/SettingLabelContainer";

export default function LayoutGroup({
  layoutGroup,
  nodeKey,
}: {
  layoutGroup: NonNullable<tailwindClassNamesGroups["layout"]>;
  nodeKey: string;
}) {
  const setNodeClassName = useComposerStore((state) => state.setNodeClassName);
  return (
    <GroupContainer groupName="Layout">
      {layoutGroup.display && (
        <SettingLabelContainer label="Display">
          <SelectList
            value={layoutGroup.display}
            onValueChange={(value) =>
              setNodeClassName(nodeKey, "display", value)
            }
            options={DISPLAY_OPTIONS}
            label="Width"
            className="col-span-2"
          />
        </SettingLabelContainer>
      )}
      {layoutGroup.display === "flex" && (
        <>
          {layoutGroup.flexDirection && (
            <SettingLabelContainer label="Direction">
              <SelectList
                value={layoutGroup.flexDirection}
                onValueChange={(value) =>
                  setNodeClassName(nodeKey, "flexDirection", value)
                }
                options={FLEX_DIRECTION_OPTIONS}
                label="Direction"
                className="col-span-2"
              />
            </SettingLabelContainer>
          )}
          {layoutGroup.justifyContent && (
            <SettingLabelContainer label="Justify">
              <SelectList
                value={layoutGroup.justifyContent}
                onValueChange={(value) =>
                  setNodeClassName(nodeKey, "justifyContent", value)
                }
                options={JUSTIFY_CONTENT_OPTIONS}
                label="Justify"
                className="col-span-2"
              />
            </SettingLabelContainer>
          )}
          {layoutGroup.alignItems && (
            <SettingLabelContainer label="Align">
              <SelectList
                value={layoutGroup.alignItems}
                onValueChange={(value) =>
                  setNodeClassName(nodeKey, "alignItems", value)
                }
                options={ALIGN_ITEMS_OPTIONS}
                label="Align"
                className="col-span-2"
              />
            </SettingLabelContainer>
          )}
        </>
      )}
      {layoutGroup.display === "grid" && (
        <>
          {layoutGroup.gridTemplateColumns && (
            <SettingLabelContainer label="Columns">
              <SelectList
                value={layoutGroup.gridTemplateColumns}
                onValueChange={(value) =>
                  setNodeClassName(nodeKey, "gridTemplateColumns", value)
                }
                options={GRID_TEMPLATE_COLUMNS_OPTIONS}
                label="Columns"
                className="col-span-2"
              />
            </SettingLabelContainer>
          )}
          {layoutGroup.gridTemplateRows && (
            <SettingLabelContainer label="Rows">
              <SelectList
                value={layoutGroup.gridTemplateRows}
                onValueChange={(value) =>
                  setNodeClassName(nodeKey, "gridTemplateRows", value)
                }
                options={GRID_TEMPLATE_ROWS_OPTIONS}
                label="Rows"
                className="col-span-2"
              />
            </SettingLabelContainer>
          )}
        </>
      )}
      {layoutGroup.display !== "hidden" && layoutGroup.padding && (
        <SettingLabelContainer label="Padding">
          <SelectList
            value={layoutGroup.padding}
            onValueChange={(value) =>
              setNodeClassName(nodeKey, "padding", value)
            }
            options={PADDING_CLASSNAMES}
            label="Padding"
            className="col-span-2"
          />
        </SettingLabelContainer>
      )}
      {layoutGroup.display !== "hidden" &&
        layoutGroup.display !== "block" &&
        layoutGroup.gap && (
          <SettingLabelContainer label="Gap">
            <SelectList
              value={layoutGroup.gap}
              onValueChange={(value) => setNodeClassName(nodeKey, "gap", value)}
              options={GAP_CLASSNAMES}
              label="Gap"
              className="col-span-2"
            />
          </SettingLabelContainer>
        )}
    </GroupContainer>
  );
}

/* function DisplayControl({
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
} */

/* function DirectionControl({
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
} */
