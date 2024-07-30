import { Label } from "@/components/ui-editor/label";
import { cn } from "@/lib/utils";
import { Input } from "../ui-editor/input";

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

	return `${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%`;
}

function hslToHex(hsl: string): string {
	const [h, s, l] = hsl
		.split(" ")
		.map((val) => Number.parseFloat(val.replace("%", "")));

	const hue = h / 360;
	const saturation = s / 100;
	const lightness = l / 100;

	let r, g, b;

	if (saturation === 0) {
		r = g = b = lightness;
	} else {
		const hue2rgb = (p: number, q: number, t: number) => {
			if (t < 0) t += 1;
			if (t > 1) t -= 1;
			if (t < 1 / 6) return p + (q - p) * 6 * t;
			if (t < 1 / 2) return q;
			if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
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
		return hex.length === 1 ? "0" + hex : hex;
	};

	return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export const HSLColorPicker = ({
	label,
	value,
	onChange,
	isDisabled,
}: {
	label: string;
	value: string;
	onChange: (color: string) => void;
	isDisabled: boolean;
}) => {
	const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const hslColor = hexToHSL(e.target.value);
		onChange(hslColor);
	};

	return (
		<div className="flex flex-col items-start w-full py-2 gap-3">
			<Label className={cn("font-semibold", isDisabled && "opacity-50")}>
				{label}
			</Label>
			<div className="flex items-center w-full gap-2">
				<Input
					type="color"
					value={hslToHex(value)}
					onChange={handleColorChange}
					className="w-12 h-10 p-1 cursor-pointer"
					disabled={isDisabled}
				/>
				<Input
					type="text"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					className="flex-grow"
					disabled={isDisabled}
				/>
			</div>
		</div>
	);
};
