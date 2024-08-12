import type { Button } from "@/components/ui-editor/button";
import type { TGenericComponentInfer } from "./elements";

export type TButtonComponent = TGenericComponentInfer<typeof Button> & {
	type: "Button";
};
