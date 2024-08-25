import React from "react";
import type { CSSVariableNames } from "@/types/style";
import { SettingLabelContainer } from "@/components/layout/SettingLabelContainer";
import { Input } from "@/components/ui-editor/input";
import { ScrollArea } from "@/components/ui-editor/scroll-area";
import { useComposerStore } from "@/store/useComposerStore";
import { cn } from "@/lib/utils";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui-editor/select";
import { THEMES } from "@/lib/themes";

function hexToHSL(originalHex: string): string {
	// Remove the hash if it exists
	const hex = originalHex.replace(/^#/, "");

	// Parse the hex values
	const r = Number.parseInt(hex.slice(0, 2), 16) / 255;
	const g = Number.parseInt(hex.slice(2, 4), 16) / 255;
	const b = Number.parseInt(hex.slice(4, 6), 16) / 255;

	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	let h = 0;
	let s = 0;
	const l = (max + min) / 2;

	if (max !== min) {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h /= 6;
	}

	return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

function hslToHex(hsl: string): string {
	const [h, s, l] = hsl.split(" ").map((val) => Number.parseFloat(val));

	const hue = h / 360;
	const saturation = s / 100;
	const lightness = l / 100;

	let r: number;
	let g: number;
	let b: number;

	if (saturation === 0) {
		r = g = b = lightness;
	} else {
		const hue2rgb = (p: number, q: number, t: number) => {
			const adjustedT = ((t % 1) + 1) % 1;
			if (adjustedT < 1 / 6) return p + (q - p) * 6 * adjustedT;
			if (adjustedT < 1 / 2) return q;
			if (adjustedT < 2 / 3) return p + (q - p) * (2 / 3 - adjustedT) * 6;
			return p;
		};

		const q =
			lightness < 0.5
				? lightness * (1 + saturation)
				: lightness + saturation - lightness * saturation;
		const p = 2 * lightness - q;
		r = hue2rgb(p, q, hue + 1 / 3);
		g = hue2rgb(p, q, hue);
		b = hue2rgb(p, q, hue - 1 / 3);
	}

	const toHex = (x: number) => {
		const hex = Math.round(x * 255).toString(16);
		return hex.length === 1 ? `0${hex}` : hex;
	};

	return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function isLightColor(hsl: string): boolean {
	const [, , l] = hsl.split(" ").map((val) => Number.parseFloat(val));
	return l > 50;
}

export const CSSVariablesEditor = () => {
	const { cssVariables, updateCSSVariable } = useComposerStore();

	const handleColorChange = (name: CSSVariableNames, value: string) => {
		const hslColor = hexToHSL(value);
		updateCSSVariable(name, hslColor);
	};

	const handleThemeChange = (themeId: string) => {
		const selectedTheme = THEMES.find((theme) => theme.name === themeId);
		if (selectedTheme) {
			for (const [name, value] of Object.entries(selectedTheme.colors)) {
				updateCSSVariable(name as CSSVariableNames, value);
			}
		}
	};

	return (
		<ScrollArea className="px-4 h-[calc(100vh-100px)]">
			<div className="flex flex-col gap-y-2 py-2">
				<SettingLabelContainer
					label="Theme"
					htmlFor="theme-selector"
					className="grid-cols-1 mx-1"
				>
					<Select onValueChange={handleThemeChange}>
						<SelectTrigger id="theme-selector">
							<SelectValue placeholder="Select a theme" />
						</SelectTrigger>
						<SelectContent>
							{THEMES.map((theme) => (
								<SelectItem key={theme.name} value={theme.name}>
									{theme.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</SettingLabelContainer>

				{Object.entries(cssVariables).map(([name, value]) => (
					<SettingLabelContainer
						key={name}
						label={name}
						htmlFor={`css-var-${name}`}
						className="grid-cols-1"
					>
						<div className="relative">
							<Input
								id={`css-var-${name}`}
								type="color"
								value={hslToHex(value)}
								onChange={(e) =>
									handleColorChange(name as CSSVariableNames, e.target.value)
								}
								className="w-full h-9 p-1 cursor-pointer"
							/>
							<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
								<span
									className={cn(
										"text-sm font-medium px-2 py-1 rounded",
										isLightColor(value) ? "text-black" : "text-white",
									)}
								>
									{value}
								</span>
							</div>
						</div>
					</SettingLabelContainer>
				))}
			</div>
		</ScrollArea>
	);
};
