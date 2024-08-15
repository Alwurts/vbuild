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
  <Root className="h-screen w-screen">
    <div className="p-4">
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
