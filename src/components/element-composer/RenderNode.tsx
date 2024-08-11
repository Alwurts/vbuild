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
import { useShadowComposerStore } from "@/store/useShadowComposerStore";
import { checkIfContentEditable } from "@/lib/jsx/draggable";

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
  const { setContentEditable } = useShadowComposerStore();
  if (typeof node !== "object") {
    return node;
  }

  function handleInput(
    e: React.FormEvent<
      HTMLButtonElement | HTMLHeadingElement | HTMLParagraphElement
    >
  ) {
    if (checkIfContentEditable(node)) {
      const newContent = (e.target as HTMLElement).innerHTML;
      console.log("Input", newContent);
      if (typeof node !== "object") return;
      setContentEditable(node.key, newContent);
    }
  }

  switch (node.type) {
    case "Root":
      return <Root {...props}>{children}</Root>;
    case "Div":
      return <Div {...props}>{children}</Div>;
    case "Button":
      return (
        <Button {...props} contentEditable onBlur={handleInput}>
          {children}
        </Button>
      );
    case "Card":
      return <Card {...props}>{children}</Card>;
    case "CardContent":
      return <CardContent {...props}>{children}</CardContent>;
    case "CardHeader":
      return <CardHeader {...props}>{children}</CardHeader>;
    case "CardFooter":
      return <CardFooter {...props}>{children}</CardFooter>;
    case "CardTitle":
      return (
        <CardTitle {...props} contentEditable onBlur={handleInput}>
          {children}
        </CardTitle>
      );
    case "CardDescription":
      return (
        <CardDescription {...props} contentEditable onBlur={handleInput}>
          {children}
        </CardDescription>
      );
  }
}
