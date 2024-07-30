import type { BadgeComponentStyle } from "@/types/badge";

export const DEFAULT_BADGE_STYLE: BadgeComponentStyle = {
	variant: {
		default: {
			background: { isApplied: true, properties: { bgColor: "bg-primary" } },
			text: {
				isApplied: true,
				properties: {
					textColor: "text-primary-foreground",
					fontSize: "text-xs",
					fontWeight: "font-semibold",
				},
			},
			border: {
				isApplied: true,
				properties: {
					borderColor: "border-transparent",
					borderWidth: "border",
					borderStyle: "border-solid",
					rounded: "rounded-full",
				},
			},
			effects: {
				isApplied: true,
				properties: { shadow: "shadow-none", opacity: "opacity-100" },
			},
			size: {
				isApplied: true,
				properties: { height: "h-4", paddingX: "px-2" },
			},
		},
		secondary: {
			background: { isApplied: true, properties: { bgColor: "bg-secondary" } },
			text: {
				isApplied: true,
				properties: {
					textColor: "text-secondary-foreground",
					fontSize: "text-xs",
					fontWeight: "font-semibold",
				},
			},
			border: {
				isApplied: true,
				properties: {
					borderColor: "border-transparent",
					borderWidth: "border",
					borderStyle: "border-solid",
					rounded: "rounded-full",
				},
			},
			effects: {
				isApplied: true,
				properties: { shadow: "shadow-none", opacity: "opacity-100" },
			},
			size: {
				isApplied: true,
				properties: { height: "h-4", paddingX: "px-2" },
			},
		},
		destructive: {
			background: {
				isApplied: true,
				properties: { bgColor: "bg-destructive" },
			},
			text: {
				isApplied: true,
				properties: {
					textColor: "text-destructive-foreground",
					fontSize: "text-xs",
					fontWeight: "font-semibold",
				},
			},
			border: {
				isApplied: true,
				properties: {
					borderColor: "border-transparent",
					borderWidth: "border",
					borderStyle: "border-solid",
					rounded: "rounded-full",
				},
			},
			effects: {
				isApplied: true,
				properties: { shadow: "shadow-none", opacity: "opacity-100" },
			},
			size: {
				isApplied: true,
				properties: { height: "h-4", paddingX: "px-2" },
			},
		},
		outline: {
			background: {
				isApplied: true,
				properties: { bgColor: "bg-transparent" },
			},
			text: {
				isApplied: true,
				properties: {
					textColor: "text-foreground",
					fontSize: "text-xs",
					fontWeight: "font-semibold",
				},
			},
			border: {
				isApplied: true,
				properties: {
					borderColor: "border-current",
					borderWidth: "border",
					borderStyle: "border-solid",
					rounded: "rounded-full",
				},
			},
			effects: {
				isApplied: true,
				properties: { shadow: "shadow-none", opacity: "opacity-100" },
			},
			size: {
				isApplied: true,
				properties: { height: "h-4", paddingX: "px-2" },
			},
		},
	},
};
