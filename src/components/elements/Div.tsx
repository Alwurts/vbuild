import { cn } from "@/lib/utils";

export const Div = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex", className)} {...props}>
    {children}
  </div>
);
