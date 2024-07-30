import { ChevronDown, ChevronUp } from "lucide-react";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";

export const CollapsibleGroup = ({
	styleIsApplied,
	toggleGroupIsApplied,
	title,
	children,
	className,
	defaultOpen = false,
	isCollapsible = true,
	showCheckbox = true,
}: {
	styleIsApplied: boolean;
	toggleGroupIsApplied: () => void;
	title: string;
	children: React.ReactNode;
	className?: string;
	defaultOpen?: boolean;
	isCollapsible?: boolean;
	showCheckbox?: boolean;
}) => {
	const [isOpen, setIsOpen] = useState(defaultOpen);

	const headerContent = (
		<div className="flex items-center justify-start gap-3">
			<div className={cn("opacity-80", styleIsApplied && "opacity-100")}>
				<div className="flex items-center justify-between gap-2">
					<h3 className="text-lg font-semibold">{title}</h3>
					{isCollapsible &&
						(isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />)}
				</div>
			</div>
			{showCheckbox && (
				<div className="flex items-center justify-start gap-2 border-l border-input pl-4">
					<Checkbox
						checked={styleIsApplied}
						onCheckedChange={toggleGroupIsApplied}
					/>
					<span className="text-sm font-medium">Apply group</span>
				</div>
			)}
		</div>
	);

	return (
		<div className="border rounded-md p-4">
			{isCollapsible ? (
				<Collapsible open={isOpen} onOpenChange={setIsOpen}>
					<CollapsibleTrigger asChild>
						<div className="cursor-pointer">{headerContent}</div>
					</CollapsibleTrigger>
					<CollapsibleContent>
						<div className={cn(className)}>{children}</div>
					</CollapsibleContent>
				</Collapsible>
			) : (
				<>
					{headerContent}
					<div className={cn(className)}>{children}</div>
				</>
			)}
		</div>
	);
};
