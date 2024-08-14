import { cn } from "@/lib/utils";

const Root = ({
  children,
  className,
  typeX = "Root",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  typeX?: "Root";
}) => (
  <div className={cn(className)} {...props}>
    {children}
  </div>
);
Root.displayName = "Root"

export default Root;
