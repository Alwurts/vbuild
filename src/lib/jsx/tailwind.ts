import type {
	TailwindClassNameRegex,
	TailwindGroups,
} from "@/types/elements/tailwind";

export const TAILWIND_CLASS_NAME_REGEX: TailwindClassNameRegex = {
	Width: /^w-/,
	Height: /^h-/,
	Padding: /^p-/,
	Margin: /^m-/,
} as const;

export const TAILWIND_GROUPS: TailwindGroups = {
	Size: ["Height", "Width"],
	Layout: ["Padding", "Margin"],
};
