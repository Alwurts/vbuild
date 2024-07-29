import { ChevronDown, ChevronUp } from "lucide-react";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";
import type {
	ButtonSize,
	ButtonVariant,
	SizeStyleGroup,
	VariantStyleGroup,
} from "@/types/style";
import { useStyleManagerStore } from "@/store/useStyleManagerStore";

export const CollapsibleGroup = ({
	styleIsApplied,
	toggleGroupIsApplied,
	title,
	children,
	className,
	defaultOpen,
}: {
	styleIsApplied: boolean;
	toggleGroupIsApplied: () => void;
	title: VariantStyleGroup | SizeStyleGroup;
	children: React.ReactNode;
	className?: string;
	defaultOpen?: boolean;
}) => {
	const [isOpen, setIsOpen] = useState(defaultOpen ?? !!styleIsApplied);
	return (
		<Collapsible open={isOpen} onOpenChange={setIsOpen}>
			<div className="flex items-center justify-start gap-3">
				<CollapsibleTrigger
					className={cn("opacity-80", styleIsApplied && "opacity-100")}
				>
					<div className="flex items-center justify-between gap-2">
						<h3 className="text-lg font-semibold">{title}</h3>
						{isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
					</div>
				</CollapsibleTrigger>
				<div className="flex items-center justify-start gap-2 border-l border-input pl-4">
					<Checkbox
						checked={styleIsApplied}
						onCheckedChange={toggleGroupIsApplied}
					/>
					<span className="text-sm font-medium">Apply group</span>
				</div>
			</div>

			<CollapsibleContent className="flex flex-col">
				<div className={cn("py-4", className)}>{children}</div>
			</CollapsibleContent>
		</Collapsible>
	);
};
