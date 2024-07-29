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
	children,
	className,
	defaultOpen,
}: {
	title: StyleGroup;
	children: React.ReactNode;
	className?: string;
	defaultOpen?: boolean;
}) => {
	const { styles, currentStyle, toggleGroupIsApplied } = useStyleManagerStore();
	const buttonStyle = styles.find((style) => style.styleName === currentStyle);
	const buttonStyleGroup = buttonStyle?.[title];
	const groupIsApplied = buttonStyleGroup?.isApplied;
	const [isOpen, setIsOpen] = useState(defaultOpen ?? !!groupIsApplied);
	return (
		<Collapsible open={isOpen} onOpenChange={setIsOpen}>
			<div className="flex items-center justify-start gap-3">
				<CollapsibleTrigger
					className={cn("opacity-80", groupIsApplied && "opacity-100")}
				>
					<div className="flex items-center justify-between gap-2">
						<h3 className="text-lg font-semibold">{title}</h3>
						{isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
					</div>
				</CollapsibleTrigger>
				<div className="flex items-center justify-start gap-2 border-l border-input pl-4">
					<Checkbox
						checked={groupIsApplied}
						onCheckedChange={(e) => toggleGroupIsApplied(currentStyle, title)}
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
