import type { Label } from "@/components/ui/label";
import type { TGenericComponentInfer } from "./elements";

export type TLabelComponent = TGenericComponentInfer<typeof Label> & {
  type: "Label";
};
