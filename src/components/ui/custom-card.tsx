
import * as React from "react";
import { cn } from "@/lib/utils";

interface CustomCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "outline" | "flat";
  children: React.ReactNode;
}

const CustomCard = React.forwardRef<HTMLDivElement, CustomCardProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg animate-fade-in",
          {
            "bg-white shadow-sm border border-slate-200 dark:bg-slate-900 dark:border-slate-800": variant === "default",
            "glass-card": variant === "glass",
            "border border-slate-200 dark:border-slate-800": variant === "outline",
            "bg-slate-50 dark:bg-slate-800/50": variant === "flat",
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CustomCard.displayName = "CustomCard";

interface CustomCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CustomCardHeader = React.forwardRef<HTMLDivElement, CustomCardHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("p-6 flex flex-col space-y-1.5", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CustomCardHeader.displayName = "CustomCardHeader";

interface CustomCardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

const CustomCardTitle = React.forwardRef<HTMLParagraphElement, CustomCardTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn("text-lg font-semibold leading-none tracking-tight", className)}
        {...props}
      >
        {children}
      </h3>
    );
  }
);

CustomCardTitle.displayName = "CustomCardTitle";

interface CustomCardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

const CustomCardDescription = React.forwardRef<HTMLParagraphElement, CustomCardDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn("text-sm text-slate-500 dark:text-slate-400", className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);

CustomCardDescription.displayName = "CustomCardDescription";

interface CustomCardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CustomCardContent = React.forwardRef<HTMLDivElement, CustomCardContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("p-6 pt-0", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CustomCardContent.displayName = "CustomCardContent";

interface CustomCardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CustomCardFooter = React.forwardRef<HTMLDivElement, CustomCardFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center p-6 pt-0", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CustomCardFooter.displayName = "CustomCardFooter";

export {
  CustomCard,
  CustomCardHeader,
  CustomCardTitle,
  CustomCardDescription,
  CustomCardContent,
  CustomCardFooter,
};
