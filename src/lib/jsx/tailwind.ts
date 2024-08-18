import type {
	TailwindClassNameRegex,
	TailwindGroups,
} from "@/types/elements/tailwind";

export const TAILWIND_CLASS_NAME_REGEX: TailwindClassNameRegex = {
	Width: /^w-/,
	Height: /^h-/,
	Padding: /^p-/,
	Margin: /^m-/,
	Display:
		/^(block|inline|inline-block|flex|inline-flex|grid|inline-grid|contents|hidden)$/,
	Direction: /^(flex-row|flex-col|flex-row-reverse|flex-col-reverse)$/,
	Justify: /^justify-/,
	Align: /^items-/,
	Gap: /^gap-/,
} as const;

export const TAILWIND_GROUPS: TailwindGroups = {
	Size: ["Height", "Width"],
	Layout: ["Padding", "Margin"],
};
