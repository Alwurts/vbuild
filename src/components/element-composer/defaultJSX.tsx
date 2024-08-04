import jsxNodesToNodesAbstract from "@/lib/jsx/jsxToNodesAbstract";
import { Root } from "@/components/elements/Root";
import { Div } from "@/components/elements/Div";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const [
  ROOT_COMPONENT_ABSTRACT_DEFAULT,
  ROOT_COMPONENT_ABSTRACT_DEFAULT_HEAD_KEY,
] = jsxNodesToNodesAbstract(
  <Root className="flex flex-col h-full items-center justify-center">
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
      <CardFooter>Card Footer</CardFooter>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
      <CardFooter>Card Footer</CardFooter>
    </Card>
  </Root>
);
