import GroupContainer from "./GroupContainer";
import {
  ALIGN_ITEMS_CLASSNAMES,
  DISPLAY_CLASSNAMES,
  FLEX_DIRECTION_CLASSNAMES,
  GAP_CLASSNAMES,
  GRID_TEMPLATE_COLUMNS_CLASSNAMES,
  GRID_TEMPLATE_ROWS_CLASSNAMES,
  JUSTIFY_CONTENT_CLASSNAMES,
  PADDING_CLASSNAMES,
} from "@/lib/tailwindClasses";
import { useComposerStore } from "@/store/useComposerStore";
import {
  schemaLayoutGroup,
  type TailwindClassNamesGroups,
} from "@/types/tailwind/tailwind";
import { SelectList } from "@/components/settings-tools/select-list";
import { SettingLabelContainer } from "@/components/layout/SettingLabelContainer";
import { Registry } from "@/components/elements/Registry";
import type { TGenericComponentsAbstract } from "@/types/elements/jsx";
import DisplayToggle from "@/components/settings-tools/display-toggle";
import FlexDirectionToggle from "@/components/settings-tools/flex-direction-toggle";

export default function LayoutGroup({
  layoutGroup,
  node,
}: {
  layoutGroup: NonNullable<TailwindClassNamesGroups["layout"]>;
  node: TGenericComponentsAbstract;
}) {
  const setClassNameGroup = useComposerStore(
    (state) => state.setClassNameGroup
  );
  return (
    <GroupContainer groupName="Layout">
      {layoutGroup.display && (
        <SettingLabelContainer
          htmlFor="display"
          label="Type"
          className="grid-cols-1 gap-1 pb-1"
        >
          <DisplayToggle
            id="display"
            value={layoutGroup.display}
            onValueChange={(newValue) => {
              const { classNameGroupsdefaults } = Registry[node.type];
              const newGroupDefaults = classNameGroupsdefaults.layout?.find(
                (group) => group.display === newValue
              );
              const parsedLayoutGroup = schemaLayoutGroup.parse({
                ...newGroupDefaults,
                ...layoutGroup,
                display: newValue,
              });
              setClassNameGroup(node.key, "layout", parsedLayoutGroup);
            }}
          />
        </SettingLabelContainer>
      )}
      {layoutGroup.display === "flex" && (
        <>
          {layoutGroup.flexDirection && (
            <SettingLabelContainer htmlFor="flexDirection" label="Direction">
              <FlexDirectionToggle
                id="flexDirection"
                value={layoutGroup.flexDirection}
                onValueChange={(value) =>
                  setClassNameGroup(node.key, "layout", {
                    ...layoutGroup,
                    flexDirection: value,
                  })
                }
              />
            </SettingLabelContainer>
          )}
          {layoutGroup.justifyContent && (
            <SettingLabelContainer htmlFor="justifyContent" label="Justify">
              <SelectList
                id="justifyContent"
                value={layoutGroup.justifyContent}
                onValueChange={(value) =>
                  setClassNameGroup(node.key, "layout", {
                    ...layoutGroup,
                    justifyContent: value,
                  })
                }
                options={JUSTIFY_CONTENT_CLASSNAMES}
                label="Justify"
                className="col-span-2"
              />
            </SettingLabelContainer>
          )}
          {layoutGroup.alignItems && (
            <SettingLabelContainer htmlFor="alignItems" label="Align">
              <SelectList
                id="alignItems"
                value={layoutGroup.alignItems}
                onValueChange={(value) =>
                  setClassNameGroup(node.key, "layout", {
                    ...layoutGroup,
                    alignItems: value,
                  })
                }
                options={ALIGN_ITEMS_CLASSNAMES}
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
            <SettingLabelContainer
              htmlFor="gridTemplateColumns"
              label="Columns"
            >
              <SelectList
                id="gridTemplateColumns"
                value={layoutGroup.gridTemplateColumns}
                onValueChange={(value) =>
                  setClassNameGroup(node.key, "layout", {
                    ...layoutGroup,
                    gridTemplateColumns: value,
                  })
                }
                options={GRID_TEMPLATE_COLUMNS_CLASSNAMES}
                label="Columns"
                className="col-span-2"
              />
            </SettingLabelContainer>
          )}
          {layoutGroup.gridTemplateRows && (
            <SettingLabelContainer htmlFor="gridTemplateRows" label="Rows">
              <SelectList
                id="gridTemplateRows"
                value={layoutGroup.gridTemplateRows}
                onValueChange={(value) =>
                  setClassNameGroup(node.key, "layout", {
                    ...layoutGroup,
                    gridTemplateRows: value,
                  })
                }
                options={GRID_TEMPLATE_ROWS_CLASSNAMES}
                label="Rows"
                className="col-span-2"
              />
            </SettingLabelContainer>
          )}
        </>
      )}
      {layoutGroup.display !== "hidden" && layoutGroup.padding && (
        <SettingLabelContainer htmlFor="padding" label="Padding">
          <SelectList
            id="padding"
            value={layoutGroup.padding}
            onValueChange={(value) =>
              setClassNameGroup(node.key, "layout", {
                ...layoutGroup,
                padding: value,
              })
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
          <SettingLabelContainer htmlFor="gap" label="Gap">
            <SelectList
              id="gap"
              value={layoutGroup.gap}
              onValueChange={(value) =>
                setClassNameGroup(node.key, "layout", {
                  ...layoutGroup,
                  gap: value,
                })
              }
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
