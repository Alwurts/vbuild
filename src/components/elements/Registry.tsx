import type { TGenericComponentRegistry } from "@/types/elements/elements";
import { Button } from "@/components/ui/button";
import {
	BadgeCheck,
	PanelsTopLeft,
	Square,
	SquareGanttChartIcon,
	SquareMousePointer,
	SquareSlash,
	Text,
	Type,
} from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Root from "./Root";
import type {
	TailwindLayoutGroup,
	TailwindSizeGroup,
	TailwindStyleGroup,
	TailwindTextGroup,
	TailwindPaddingGroup,
} from "@/types/tailwind/tailwind";
import { Badge } from "@/components/ui/badge";

const defaultStyle: TailwindStyleGroup = {
	backgroundColor: "bg-transparent",
};

const defaultText: TailwindTextGroup = {
	fontSize: "text-base",
	fontWeight: "font-normal",
	textAlign: "text-left",
	textColor: "text-black",
};

const defaultAutoSize: TailwindSizeGroup = {
	width: "w-auto",
	height: "h-auto",
};

const defaultLayout: TailwindLayoutGroup = {
	display: "block",
};

const defaultPadding: TailwindPaddingGroup = { padding: "p-0" };

const defaultLayoutAndPadding: {
	layout: TailwindLayoutGroup;
	padding: TailwindPaddingGroup;
} = {
	layout: defaultLayout,
	padding: defaultPadding,
};

export const Registry: TGenericComponentRegistry = {
	Root: {
		type: "Root",
		icon: <PanelsTopLeft />,
		component: <Root />,
		dependencies: [],
		draggable: false,
		droppable: true,
		editable: false,
		classNameGroupsdefaults: {
			size: {
				width: "w-screen",
				height: "h-screen",
			},
			style: {
				backgroundColor: "bg-background",
			},
			...defaultLayoutAndPadding,
		},
	},
	div: {
		type: "div",
		icon: <Square />,
		component: <div />,
		dependencies: [],
		draggable: true,
		droppable: true,
		editable: false,
		classNameGroupsdefaults: {
			size: {
				width: "w-full",
				height: "h-auto",
			},
			style: {
				backgroundColor: "bg-transparent",
				borderRadius: "rounded-none",
			},
			...defaultLayoutAndPadding,
		},
	},
	h1: {
		type: "h1",
		icon: <Type />,
		// biome-ignore lint/a11y/useHeadingContent: <explanation>
		component: <h1 />,
		dependencies: [],
		draggable: true,
		droppable: false,
		editable: true,
		classNameGroupsdefaults: {
			size: defaultAutoSize,
			text: {
				...defaultText,
				fontSize: "text-4xl",
			},
			style: defaultStyle,
		},
	},
	h2: {
		type: "h2",
		icon: <Type />,
		// biome-ignore lint/a11y/useHeadingContent: <explanation>
		component: <h2 />,
		dependencies: [],
		draggable: true,
		droppable: false,
		editable: true,
		classNameGroupsdefaults: {
			size: defaultAutoSize,
			text: {
				...defaultText,
				fontSize: "text-3xl",
			},
			style: defaultStyle,
		},
	},
	h3: {
		type: "h3",
		icon: <Type />,
		// biome-ignore lint/a11y/useHeadingContent: <explanation>
		component: <h3 />,
		dependencies: [],
		draggable: true,
		droppable: false,
		editable: true,
		classNameGroupsdefaults: {
			size: defaultAutoSize,
			text: {
				...defaultText,
				fontSize: "text-2xl",
			},
			style: defaultStyle,
		},
	},
	h4: {
		type: "h4",
		icon: <Type />,
		// biome-ignore lint/a11y/useHeadingContent: <explanation>
		component: <h4 />,
		dependencies: [],
		draggable: true,
		droppable: false,
		editable: true,
		classNameGroupsdefaults: {
			size: defaultAutoSize,
			text: {
				...defaultText,
				fontSize: "text-xl",
			},
			style: defaultStyle,
		},
	},
	p: {
		type: "p",
		icon: <Text />,
		component: <p />,
		dependencies: [],
		draggable: true,
		droppable: false,
		editable: true,
		classNameGroupsdefaults: {
			size: defaultAutoSize,
			text: defaultText,
			style: defaultStyle,
		},
	},
	Card: {
		type: "Card",
		icon: <SquareSlash />,
		component: <Card />,
		dependencies: ["@/components/ui/Card"],
		draggable: true,
		droppable: true,
		editable: false,
		classNameGroupsdefaults: {
			size: defaultAutoSize,
			style: {
				backgroundColor: "bg-card",
				borderRadius: "rounded-lg",
				/* borderWidth: "border",
				boxShadow: "shadow-sm", */
			},
			/* text: {
				...defaultText,
				textColor: "text-card-foreground",
			}, */
			layout: defaultLayout,
			padding: defaultPadding,
		},
	},
	CardContent: {
		type: "CardContent",
		icon: <SquareSlash />,
		component: <CardContent />,
		dependencies: ["@/components/ui/CardContent"],
		draggable: true,
		droppable: true,
		editable: false,
		classNameGroupsdefaults: {
			size: defaultAutoSize,
			style: defaultStyle,
			layout: defaultLayout,
			padding: {
				paddingTop: "pt-0",
				paddingLeft: "pl-6",
				paddingRight: "pr-6",
				paddingBottom: "pb-6",
			},
		},
	},
	CardHeader: {
		type: "CardHeader",
		icon: <SquareSlash />,
		component: <CardHeader />,
		dependencies: ["@/components/ui/CardHeader"],
		draggable: true,
		droppable: true,
		editable: false,
		classNameGroupsdefaults: {
			size: defaultAutoSize,
			style: defaultStyle,
			layout: {
				display: "flex",
				flexDirection: "flex-col",
				justifyContent: "justify-start",
				alignItems: "items-start",
				gap: "gap-1.5",
			},
			padding: {
				padding: "p-6",
			},
		},
	},
	CardFooter: {
		type: "CardFooter",
		icon: <SquareSlash />,
		component: <CardFooter />,
		dependencies: ["@/components/ui/CardFooter"],
		draggable: true,
		droppable: true,
		editable: false,
		classNameGroupsdefaults: {
			size: defaultAutoSize,
			style: defaultStyle,
			layout: defaultLayout,
			padding: {
				paddingTop: "pt-0",
				paddingLeft: "pl-6",
				paddingRight: "pr-6",
				paddingBottom: "pb-6",
			},
		},
	},
	CardTitle: {
		type: "CardTitle",
		icon: <SquareSlash />,
		component: <CardTitle />,
		dependencies: ["@/components/ui/CardTitle"],
		draggable: true,
		droppable: false,
		editable: true,
		classNameGroupsdefaults: {
			size: defaultAutoSize,
			text: {
				...defaultText,
				fontSize: "text-2xl",
				fontWeight: "font-semibold",
				textColor: "text-card-foreground",
			},
			style: defaultStyle,
		},
	},
	CardDescription: {
		type: "CardDescription",
		icon: <SquareSlash />,
		component: <CardDescription />,
		dependencies: ["@/components/ui/CardDescription"],
		draggable: true,
		droppable: false,
		editable: true,
		classNameGroupsdefaults: {
			size: defaultAutoSize,
			text: {
				...defaultText,
				fontSize: "text-sm",
				textColor: "text-muted-foreground",
			},
			style: defaultStyle,
		},
	},
	Button: {
		type: "Button",
		icon: <SquareMousePointer />,
		component: <Button />,
		dependencies: ["@/components/ui/Button"],
		draggable: true,
		droppable: false,
		editable: true,
		classNameGroupsdefaults: {
			size: {
				width: "w-auto",
				height: "h-10",
			},
			style: {
				backgroundColor: "bg-primary",
				borderRadius: "rounded-md",
			},
			text: {
				textColor: "text-primary-foreground",
				fontSize: "text-sm",
				fontWeight: "font-medium",
				textAlign: "text-center",
				/* whiteSpace: "whitespace-nowrap", */
			},
			layout: defaultLayout,
			/* layout: {
				display: "inline-flex",
				alignItems: "items-center",
				justifyContent: "justify-center",
			}, */
			padding: {
				paddingX: "px-4",
				paddingY: "py-2",
			},
		},
	},
	Badge: {
		type: "Badge",
		icon: <BadgeCheck />,
		component: <Badge />,
		dependencies: ["@/components/ui/badge"],
		draggable: true,
		droppable: false,
		editable: true,
		classNameGroupsdefaults: {
			size: {
				width: "w-auto",
				height: "h-auto",
			},
			style: {
				backgroundColor: "bg-primary",
				borderRadius: "rounded-full",
				/* borderWidth: "border",
				borderColor: "border-transparent", */
			},
			text: {
				...defaultText,
				textColor: "text-primary-foreground",
				fontSize: "text-xs",
				fontWeight: "font-semibold",
			},
			layout: defaultLayout,
			padding: {
				paddingX: "px-2.5",
				paddingY: "py-0.5",
			},
		},
	},
} as const;
