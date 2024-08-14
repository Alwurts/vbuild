import jsxNodesToNodesAbstract from "@/lib/jsx/jsxToNodesAbstract";
import Root from "@/components/elements/Root";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const [
  ROOT_COMPONENT_ABSTRACT_DEFAULT,
  ROOT_COMPONENT_ABSTRACT_DEFAULT_HEAD_KEY,
] = jsxNodesToNodesAbstract(
  <Root className="flex flex-col items-stretch justify-center h-screen w-screen p-4 gap-4">
    <div className="border border-border rounded-lg p-4 h-full">
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <Button>Button</Button>
        </CardContent>
      </Card>
    </div>
  </Root>
);
