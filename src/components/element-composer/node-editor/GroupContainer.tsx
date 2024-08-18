import { Separator } from "@/components/ui-editor/separator";
import { cn } from "@/lib/utils";
import type { TailwindGroupName } from "@/types/elements/tailwind";

export default function GroupContainer({
  groupName,
  children,
  className,
}: {
  groupName: TailwindGroupName;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="text-sm">
      <div className="p-2 flex flex-col gap-2">
        <h4 className="text-sm font-semibold">{groupName}</h4>
        <div className={cn("grid grid-cols-3 items-start gap-2", className)}>
          {children}
        </div>
      </div>
      <Separator />
    </div>
  );
}
