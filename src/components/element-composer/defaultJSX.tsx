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
  <Root className="flex flex-col items-stretch justify-start h-screen w-screen p-4 gap-4">
    <Div className="border border-border rounded-lg">
      <CardTitle className="text-red-500 font-bold">Card Title</CardTitle>
    </Div>
    <Card className="">
      <CardHeader>
        <CardTitle className="text-red-500 font-bold">Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
      <CardFooter>Card Footer</CardFooter>
    </Card>
  </Root>
);
