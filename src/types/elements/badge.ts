import type { Badge } from "@/components/ui/badge";
import type { TGenericComponentInfer } from "./elements";

export type TBadgeComponent = TGenericComponentInfer<typeof Badge> & {
	type: "Badge";
};
