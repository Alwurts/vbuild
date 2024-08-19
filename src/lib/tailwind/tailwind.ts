import type {
	TailwindClassName,
	TailwindClassNameRegex,
} from "@/types/tailwind/tailwind";

export const TAILWIND_REGEX: TailwindClassNameRegex = {
	width: /^w-/,
	height: /^h-/,
	padding: /^p-/,
	margin: /^m-/,
	display:
		/^(block|inline|inline-block|flex|inline-flex|grid|inline-grid|contents|hidden)$/,
	/* flexDirection: /^(flex-row|flex-col|flex-row-reverse|flex-col-reverse)$/,
	justifyContent: /^justify-/,
	alignItems: /^items-/,
	gap: /^gap-/, */
} as const;

export const TAILWIND_DEFAULT_PROPERTY_VALUES: TailwindClassName = {
	width: "w-full",
	height: "h-auto",
	padding: "p-0",
	margin: "m-0",
	display: "block",
};
