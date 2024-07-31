import { cn } from "@/lib/utils";
import { useComposerStore } from "@/store/useComposerStore";
import { useOverlayStore } from "@/store/useOverlayStore";
import React from "react";
import { useState, useRef, useEffect, useMemo } from "react";

export function isHTMLElement(
  target: EventTarget | null
): target is HTMLElement {
  return target instanceof HTMLElement;
}

export const calculateBoxForElement = (
  element: HTMLElement,
  boxType: "margin" | "border" | "padding" | "content"
): DOMRect => {
  const rect = element.getBoundingClientRect();
  const style = window.getComputedStyle(element);

  switch (boxType) {
    case "margin":
      return new DOMRect(
        Number.parseFloat(style.marginLeft),
        Number.parseFloat(style.marginTop),
        rect.width +
          Number.parseFloat(style.marginLeft) +
          Number.parseFloat(style.marginRight),
        rect.height +
          Number.parseFloat(style.marginTop) +
          Number.parseFloat(style.marginBottom)
      );
    case "padding":
      return new DOMRect(
        Number.parseFloat(style.borderLeftWidth),
        Number.parseFloat(style.borderTopWidth),
        rect.width -
          Number.parseFloat(style.borderLeftWidth) -
          Number.parseFloat(style.borderRightWidth),
        rect.height -
          Number.parseFloat(style.borderTopWidth) -
          Number.parseFloat(style.borderBottomWidth)
      );
    case "content":
      return new DOMRect(
        Number.parseFloat(style.borderLeftWidth) +
          Number.parseFloat(style.paddingLeft),
        Number.parseFloat(style.borderTopWidth) +
          Number.parseFloat(style.paddingTop),
        rect.width -
          Number.parseFloat(style.borderLeftWidth) -
          Number.parseFloat(style.borderRightWidth) -
          Number.parseFloat(style.paddingLeft) -
          Number.parseFloat(style.paddingRight),
        rect.height -
          Number.parseFloat(style.borderTopWidth) -
          Number.parseFloat(style.borderBottomWidth) -
          Number.parseFloat(style.paddingTop) -
          Number.parseFloat(style.paddingBottom)
      );
    default:
      return rect;
  }
};

export function boxClipPaths(parentBox: DOMRect, clipBox?: DOMRect) {
  if (!clipBox) {
    return [parentBox];
  }
  const boxLeft = new DOMRect(
    parentBox.left,
    parentBox.top,
    clipBox.left - parentBox.left,
    parentBox.height
  );

  const boxTop = new DOMRect(
    clipBox.left,
    parentBox.top,
    clipBox.width,
    clipBox.top - parentBox.top
  );

  const boxRight = new DOMRect(
    clipBox.right,
    parentBox.top,
    parentBox.right - clipBox.right,
    parentBox.height
  );

  const boxBottom = new DOMRect(
    clipBox.left,
    clipBox.bottom,
    clipBox.width,
    parentBox.bottom - clipBox.bottom
  );

  return [boxLeft, boxTop, boxRight, boxBottom];
}

interface OverlayProps {
  boxClipPaths: DOMRect[];
  overlayColor: string;
}

export const ComponentOverlay = ({
  boxClipPaths,
  overlayColor,
}: OverlayProps) => {
  const paths = boxClipPaths;

  return (
    <>
      {paths.map((path, index) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          key={index}
          style={{
            position: "absolute",
            left: path.left,
            top: path.top,
            width: path.width,
            height: path.height,
            backgroundColor: overlayColor,
            pointerEvents: "none",
            zIndex: 10,
          }}
        />
      ))}
    </>
  );
};

export const ComponentOverlayWrapper = ({
  key,
  children,
}: {
  key: string;
  children: React.ReactNode;
}) => {
  const {
    overlaysAreActive,
    nodeKey,
    overlayContentRects,
    overlayPaddingRects,
    setOverlay,
    clearOverlay,
  } = useOverlayStore();

  const { selectedNodeKey, setSelectedNodeKey } = useComposerStore();

  const childrenCloneAndEvents = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        /* className: cn({
          "pointer-events-none": nodeKey === key,
        }), */
        onClick:
          overlaysAreActive && nodeKey === key
            ? undefined
            : child.props.onClick,
      } as React.HTMLAttributes<HTMLElement>);
    }
    return child;
  });

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      style={{ position: "relative" }}
      onMouseEnter={
        overlaysAreActive
          ? (e: React.MouseEvent<HTMLElement>) => {
              const target = e.target;
              console.log("mouse enter");
              if (isHTMLElement(target)) {
                const contentRect = calculateBoxForElement(target, "content");
                /* const marginRect = calculateBoxForElement(target, "margin");
        const borderRect = calculateBoxForElement(target, "border"); */
                const paddingRect = calculateBoxForElement(target, "padding");

                /* const marginRects = boxClipPaths(marginRect, borderRect); */
                /* const borderRects = boxClipPaths(borderRect, paddingRect);*/
                const paddingRects = boxClipPaths(paddingRect, contentRect);

                setOverlay(key, "content", [contentRect]);
                setOverlay(key, "padding", paddingRects);
              }
            }
          : undefined
      }
      onClick={
        overlaysAreActive
          ? (e) => {
              e.stopPropagation();
              console.log("clickDiv");
              setSelectedNodeKey(key);
            }
          : undefined
      }
      onMouseLeave={
        overlaysAreActive
          ? () => {
              clearOverlay();
            }
          : undefined
      }
    >
      {childrenCloneAndEvents}
      {overlaysAreActive && nodeKey === key && (
        <div className="absolute inset-0 pointer-events-none z-10">
          <ComponentOverlay
            boxClipPaths={overlayContentRects}
            overlayColor="rgba(0, 136, 207, 0.4)"
          />
          <ComponentOverlay
            boxClipPaths={overlayPaddingRects}
            overlayColor="rgba(35, 175, 0, 0.4)"
          />
        </div>
      )}
    </div>
  );
};
