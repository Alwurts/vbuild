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
    classNameGroupsdefaults: {
      size: {
        width: "w-screen",
        height: "h-screen",
      },
      style: {
        backgroundColor: "bg-background",
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
    classNameGroupsdefaults: {
      size: {
        width: "w-full",
        height: "h-auto",
      },
      style: {
        backgroundColor: "bg-transparent",
      },
      layout: [
        {
          display: "block",
          padding: "p-0",
        },
        {
          display: "flex",
          flexDirection: "flex-row",
          justifyContent: "justify-start",
          alignItems: "items-start",
          gap: "gap-0",
          padding: "p-0",
        },
        {
          display: "grid",
          gridTemplateColumns: "grid-cols-1",
          gridTemplateRows: "grid-rows-1",
          gap: "gap-0",
          padding: "p-0",
        },
        {
          display: "hidden",
        },
      ],
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
      size: {
        width: "w-auto",
        height: "h-auto",
      },
      text: {
        fontSize: "text-4xl",
        fontWeight: "font-bold",
        textAlign: "text-left",
        textColor: "text-black",
      },
      style: {
        backgroundColor: "bg-transparent",
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
    classNameGroupsdefaults: {
      size: {
        width: "w-auto",
        height: "h-auto",
      },
      text: {
        fontSize: "text-3xl",
        fontWeight: "font-bold",
        textAlign: "text-left",
        textColor: "text-black",
      },
      style: {
        backgroundColor: "bg-transparent",
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
    classNameGroupsdefaults: {
      size: {
        width: "w-auto",
        height: "h-auto",
      },
      text: {
        fontSize: "text-2xl",
        fontWeight: "font-bold",
        textAlign: "text-left",
        textColor: "text-black",
      },
      style: {
        backgroundColor: "bg-transparent",
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
    classNameGroupsdefaults: {
      size: {
        width: "w-auto",
        height: "h-auto",
      },
      text: {
        fontSize: "text-xl",
        fontWeight: "font-bold",
        textAlign: "text-left",
        textColor: "text-black",
      },
      style: {
        backgroundColor: "bg-transparent",
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
    classNameGroupsdefaults: {
      size: {
        width: "w-auto",
        height: "h-auto",
      },
      text: {
        fontSize: "text-lg",
        fontWeight: "font-bold",
        textAlign: "text-left",
        textColor: "text-black",
      },
      style: {
        backgroundColor: "bg-transparent",
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
    classNameGroupsdefaults: {
      size: {
        width: "w-auto",
        height: "h-auto",
      },
      text: {
        fontSize: "text-base",
        fontWeight: "font-normal",
        textAlign: "text-left",
        textColor: "text-black",
      },
      style: {
        backgroundColor: "bg-transparent",
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
    classNameGroupsdefaults: {
      size: {
        width: "w-auto",
        height: "h-auto",
      },
      text: {
        fontSize: "text-base",
        fontWeight: "font-normal",
        textAlign: "text-left",
        textColor: "text-black",
      },
      style: {
        backgroundColor: "bg-transparent",
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
    classNameGroupsdefaults: {
      size: {
        width: "w-auto",
        height: "h-auto",
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
    classNameGroupsdefaults: {},
  },
  CardHeader: {
    type: "CardHeader",
    icon: <SquareSlash />,
    component: <CardHeader />,
    dependencies: ["@/components/ui/CardHeader"],
    draggable: true,
    droppable: true,
    editable: false,
    classNameGroupsdefaults: {},
  },
  CardFooter: {
    type: "CardFooter",
    icon: <SquareSlash />,
    component: <CardFooter />,
    dependencies: ["@/components/ui/CardFooter"],
    draggable: true,
    droppable: true,
    editable: false,
    classNameGroupsdefaults: {},
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
      size: {
        width: "w-auto",
        height: "h-auto",
      },
      text: {
        fontSize: "text-2xl",
        fontWeight: "font-bold",
        textAlign: "text-left",
        textColor: "text-black",
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
    classNameGroupsdefaults: {
      size: {
        width: "w-auto",
        height: "h-auto",
      },
      text: {
        fontSize: "text-base",
        fontWeight: "font-normal",
        textAlign: "text-left",
        textColor: "text-black",
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
    classNameGroupsdefaults: {},
  },
} as const;
