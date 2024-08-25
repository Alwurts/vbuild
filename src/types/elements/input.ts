import type { Input } from "@/components/ui/input";
import type { TGenericComponentInfer } from "./elements";

export type TInputComponent = TGenericComponentInfer<typeof Input> & {
  type: "Input";
};

export type TAComponent = TGenericComponentInfer<
  React.HTMLAttributes<HTMLAnchorElement>
> & {
  type: "a";
};
