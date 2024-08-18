import type { TGenericComponentRegistry } from "@/types/elements/elements";
import { Button } from "../ui/button";
import {
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
} from "../ui/card";
import Root from "./Root";

export const Registry: TGenericComponentRegistry = {
  Root: {
    type: "Root",
    icon: <PanelsTopLeft />,
    component: <Root />,
    dependencies: [],
    draggable: false,
    droppable: true,
    editable: false,
    classNameGroups: {
      Size: {
        Height: "h-screen",
        Width: "w-screen",
      },
      Layout: {
        Padding: "p-0",
        Margin: "m-0",
      },
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
    classNameGroups: {
      Size: {
        Height: "h-auto",
        Width: "w-full",
      },
      Layout: {
        Display: "block",
        Direction: "flex-row",
        Justify: "justify-start",
        Align: "items-start",
        Gap: "gap-0",
        Padding: "p-0",
        Margin: "m-0",
      },
    },
  },
  span: {
    type: "span",
    icon: <SquareGanttChartIcon />,
    component: <span />,
    dependencies: [],
    draggable: true,
    droppable: true,
    editable: true,
    classNameGroups: {
      Size: {
        Height: "h-auto",
        Width: "w-auto",
      },
      Layout: {
        Padding: "p-0",
        Margin: "m-0",
      },
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
    classNameGroups: {
      Size: {
        Height: "h-auto",
        Width: "w-full",
      },
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
    classNameGroups: {
      Size: {
        Height: "h-auto",
        Width: "w-full",
      },
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
    classNameGroups: {
      Size: {
        Height: "h-auto",
        Width: "w-full",
      },
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
    classNameGroups: {
      Size: {
        Height: "h-auto",
        Width: "w-full",
      },
    },
  },
  h5: {
    type: "h5",
    icon: <Type />,
    // biome-ignore lint/a11y/useHeadingContent: <explanation>
    component: <h5 />,
    dependencies: [],
    draggable: true,
    droppable: false,
    editable: true,
    classNameGroups: {
      Size: {
        Height: "h-auto",
        Width: "w-full",
      },
    },
  },
  h6: {
    type: "h6",
    icon: <Type />,
    // biome-ignore lint/a11y/useHeadingContent: <explanation>
    component: <h6 />,
    dependencies: [],
    draggable: true,
    droppable: false,
    editable: true,
    classNameGroups: {
      Size: {
        Height: "h-auto",
        Width: "w-full",
      },
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
    classNameGroups: {
      Size: {
        Height: "h-auto",
        Width: "w-full",
      },
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
    classNameGroups: {
      Size: {
        Height: "h-auto",
        Width: "w-full",
      },
      Layout: {
        Padding: "p-0",
        Margin: "m-0",
      },
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
    classNameGroups: {
      Size: {
        Height: "h-auto",
        Width: "w-full",
      },
      Layout: {
        Padding: "p-6",
        Margin: "m-0",
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
    classNameGroups: {
      Size: {
        Height: "h-auto",
        Width: "w-full",
      },
      Layout: {
        Padding: "p-6",
        Margin: "m-0",
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
    classNameGroups: {
      Size: {
        Height: "h-auto",
        Width: "w-full",
      },
      Layout: {
        Padding: "p-6",
        Margin: "m-0",
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
    classNameGroups: {
      Size: {
        Height: "h-auto",
        Width: "w-full",
      },
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
    classNameGroups: {
      Size: {
        Height: "h-auto",
        Width: "w-full",
      },
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
    classNameGroups: {
      Size: {
        Height: "h-10",
        Width: "w-auto",
      },
      Layout: {
        Padding: "p-3",
        Margin: "m-0",
      },
    },
  },
} as const;
