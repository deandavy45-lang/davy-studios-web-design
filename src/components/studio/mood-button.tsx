import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const moodButtonVariants = cva(
  "btn-mood inline-flex items-center justify-center gap-2 text-center text-sm leading-tight cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 active:translate-y-px",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:opacity-90",
        outline: "border border-current bg-transparent text-foreground shadow-none hover:bg-foreground/5",
        whatsapp: "bg-whatsapp text-whatsapp-foreground hover:opacity-90",
        ghost: "bg-transparent text-foreground shadow-none underline-offset-4 hover:underline",
        hero: "bg-hero-accent text-hero-accent-foreground hover:opacity-90",
        heroOutline: "border border-hero-foreground/70 bg-hero-foreground/5 text-hero-foreground shadow-none backdrop-blur-sm hover:bg-hero-foreground/15",
      },
      size: {
        default: "min-h-11 px-5 py-2.5",
        lg: "min-h-12 px-7 py-3 text-base",
        sm: "min-h-9 px-4 py-2 text-xs",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export interface MoodButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof moodButtonVariants> {
  asChild?: boolean;
}

export const MoodButton = React.forwardRef<HTMLButtonElement, MoodButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp ref={ref} className={cn(moodButtonVariants({ variant, size }), className)} {...props} />;
  },
);
MoodButton.displayName = "MoodButton";
