import React from "react";
import { useStyleManagerStore } from "@/store/useStyleManagerStore";
import { ColorPicker } from "@/components/editor-tools/ColorPicker";
import type { CSSVariableNames } from "@/types/style";

export const CSSVariablesEditor = () => {
	const { cssVariables, setCSSVariable } = useStyleManagerStore();

	console.log(cssVariables);

	return (
		<div className="space-y-4">
			{Object.entries(cssVariables).map(([name, value]) => (
				<div key={name}>
					{name === "radius" ? null : (
						<ColorPicker
							label={name}
							value={`bg-[${value}]`}
							onChange={(color) =>
								setCSSVariable(
									name as CSSVariableNames,
									color.replace("bg-[", "").replace("]", ""),
								)
							}
							isDisabled={false}
						/>
					)}
				</div>
			))}
		</div>
	);
};
