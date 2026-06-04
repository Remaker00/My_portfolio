import { cn } from "@/lib/utils";
import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  external?: boolean;
};

const variants = {
  primary:
    "bg-foreground text-background hover:bg-foreground/90 shadow-lg shadow-accent/10",
  secondary:
    "border border-border bg-card/50 text-foreground backdrop-blur-sm hover:border-accent/50 hover:bg-card",
  ghost: "text-muted hover:text-foreground",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3 text-base",
};

const interactive =
  "transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]";

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  onClick,
  type = "button",
  external,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    interactive,
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    const isExternal =
      external ||
      href.startsWith("http") ||
      href.startsWith("mailto") ||
      href.endsWith(".pdf");

    if (isExternal || href.startsWith("#")) {
      return (
        <a
          href={href}
          target={external && href.startsWith("http") ? "_blank" : undefined}
          rel={
            external && href.startsWith("http")
              ? "noopener noreferrer"
              : undefined
          }
          download={href.endsWith(".pdf") ? true : undefined}
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
