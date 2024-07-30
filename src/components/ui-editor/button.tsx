import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background-editor transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-editor focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary-editor text-primary-editor-foreground hover:bg-primary-editor/90",
        destructive:
          "bg-destructive-editor text-destructive-editor-foreground hover:bg-destructive-editor/90",
        outline:
          "border border-input bg-background-editor hover:bg-accent-editor hover:text-accent-editor-foreground",
        secondary:
          "bg-secondary-editor text-secondary-editor-foreground hover:bg-secondary-editor/80",
        ghost: "hover:bg-accent-editor hover:text-accent-editor-foreground",
        link: "text-primary-editor underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
