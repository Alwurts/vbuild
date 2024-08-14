import jsxNodesToNodesAbstract from "@/lib/jsx/jsxToNodesAbstract";
import Root from "@/components/elements/Root";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const [
  ROOT_COMPONENT_ABSTRACT_DEFAULT,
  ROOT_COMPONENT_ABSTRACT_DEFAULT_HEAD_KEY,
] = jsxNodesToNodesAbstract(
  <Root className="flex flex-col items-stretch justify-center h-screen w-screen p-4 gap-4 bg-purple-400">
    <div className="border border-border rounded-lg p-4 h-full bg-gray-400">
      <h1 className="text-red-500 font-bold">Card Title</h1>
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
      </Card>
    </div>
  </Root>
);
