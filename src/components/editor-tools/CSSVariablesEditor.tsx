import React, { useEffect } from "react";
import { useStyleManagerStore } from "@/store/useStyleManagerStore";
import { HSLColorPicker } from "@/components/editor-tools/HSLColorPicker";
import { CSSVariableNames } from "@/types/style";

export const CSSVariablesEditor = () => {
  const { cssVariables, setCSSVariable, setCSSVariables } =
    useStyleManagerStore();

  useEffect(() => {
    const object = {} as {
      [K in CSSVariableNames]: string;
    };
    for (const key of Object.keys(CSSVariableNames)) {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue(`--${key}`)
        .trim();
      object[key as CSSVariableNames] = value;
    }
    setCSSVariables(object);
  }, [setCSSVariables]);

  return (
    <div className="gap-x-4 gap-y-2 grid grid-cols-2">
      {Object.entries(cssVariables ?? {}).map(([name, value]) => (
        <div key={name}>
          {name === "radius" ? null : (
            <HSLColorPicker
              label={name}
              value={value}
              onChange={(color) =>
                setCSSVariable(name as CSSVariableNames, color)
              }
              isDisabled={false}
            />
          )}
        </div>
      ))}
    </div>
  );
};