import type { TNodeAbstract } from "@/types/elements/jsx";
import { Button } from "@/components/ui-editor/button";
import { Div } from "@/components/elements/Div";
import { Root } from "@/components/elements/Root";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function RenderNode({
  node,
  children,
  ...props
}: {
  node: TNodeAbstract;
  children: React.ReactNode;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  [key: string]: any;
}): React.ReactNode {
  if (typeof node !== "object") {
    return node;
  }

  switch (node.type) {
    case "Root":
      return <Root {...props}>{children}</Root>;
    case "Div":
      return <Div {...props}>{children}</Div>;
    case "Button":
      return <Button {...props}>{children}</Button>;
    case "Card":
      return <Card {...props}>{children}</Card>;
    case "CardContent":
      return <CardContent {...props}>{children}</CardContent>;
    case "CardHeader":
      return <CardHeader {...props}>{children}</CardHeader>;
    case "CardFooter":
      return <CardFooter {...props}>{children}</CardFooter>;
    case "CardTitle":
      return <CardTitle {...props}>{children}</CardTitle>;
    case "CardDescription":
      return <CardDescription {...props}>{children}</CardDescription>;
  }
}
