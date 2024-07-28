import { ChevronDown, ChevronUp } from "lucide-react";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "./ui/collapsible";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const CollapsibleGroup = ({
	title,
	isVisible,
	children,
	className,
}: {
	title: string;
	isVisible: boolean;
	children: React.ReactNode;
	className?: string;
}) => {
	const [isOpen, setIsOpen] = useState(isVisible);
	return (
		<Collapsible open={isOpen} onOpenChange={setIsOpen}>
			<CollapsibleTrigger>
				<div className="flex items-center justify-between gap-2">
					<h3 className="text-lg font-semibold">{title}</h3>
					{isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
				</div>
			</CollapsibleTrigger>
			<CollapsibleContent className={cn(className ?? "grid gap-4 py-4")}>
				{children}
			</CollapsibleContent>
		</Collapsible>
	);
};
