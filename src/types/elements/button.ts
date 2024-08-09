import type { Button } from "@/components/ui-editor/button";
import type { TComponent, TGenericComponentParent } from "./jsx";

export type TButtonComponent = TComponent<typeof Button> &
	TGenericComponentParent & {
		type: "Button";
	};
