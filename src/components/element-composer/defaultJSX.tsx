import jsxNodesToNodesAbstract from "@/lib/jsx/jsxToNodesAbstract";
import { Root } from "@/components/elements/Root";
import { Div } from "@/components/elements/Div";
import { Button } from "@/components/ui/button";

export const [
  ROOT_COMPONENT_ABSTRACT_DEFAULT,
  ROOT_COMPONENT_ABSTRACT_DEFAULT_HEAD_KEY,
] = jsxNodesToNodesAbstract(
  <Root className="bg-red-500">
    <Button>Button 1</Button>
    <Button>Button 2</Button>
    <Button>Button 3</Button>
    <Div>
      <Button>Button 4</Button>
      <Button>Button 5</Button>
      <Button>Button 6</Button>
    </Div>
    <Div/>
  </Root>
);
