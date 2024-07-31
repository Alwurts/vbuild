import { cn } from "@/lib/utils";

export const Span = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn("flex", className)} {...props}>
    {children}
  </span>
);
