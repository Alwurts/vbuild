import { ChevronDown, ChevronUp } from "lucide-react";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";
import type { StyleGroup } from "@/types/style";
import { useStyleManagerStore } from "@/store/useStyleManagerStore";

export const CollapsibleGroup = ({
	title,
	isVisible,
	children,
	className,
}: {
	title: StyleGroup;
	isVisible: boolean;
	children: React.ReactNode;
	className?: string;
}) => {
	/* const { styles, currentStyle } = useStyleManagerStore(); */
	/* const groupStyle = styles[currentStyle][title]; */
	const [isOpen, setIsOpen] = useState(isVisible);
	/* const [isApplied, setIsApplied] = useState(!!groupStyle); */
	return (
		<Collapsible open={isOpen} onOpenChange={setIsOpen}>
			{/* <div> */}
			<CollapsibleTrigger
			/* className={cn("opacity-80", isApplied && "opacity-100")} */
			>
				<div className="flex items-center justify-between gap-2">
					<h3 className="text-lg font-semibold">{title}</h3>
					{isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
				</div>
			</CollapsibleTrigger>
			{/* <Checkbox
					checked={isApplied}
					onCheckedChange={(e) => setIsApplied((prev) => !prev)}
				/>
			</div> */}
			<CollapsibleContent className={cn(className ?? "grid gap-4 py-4")}>
				{children}
			</CollapsibleContent>
		</Collapsible>
	);
};
