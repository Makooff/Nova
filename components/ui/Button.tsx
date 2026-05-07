import Link from "next/link";
import { ReactNode } from "react";

type Variant = "fill" | "outline" | "ghost";

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  size?: "sm" | "md" | "lg";
}

const base =
  "inline-flex items-center justify-center rounded-full font-sora font-medium transition-all duration-200 cursor-pointer";

const variants: Record<Variant, string> = {
  fill: "bg-black text-white hover:bg-dark",
  outline: "bg-transparent text-black border border-black hover:bg-ghost",
  ghost: "bg-transparent text-black hover:bg-ghost",
};

const sizes = {
  sm: "text-xs px-4 py-2",
  md: "text-sm px-5 py-2.5",
  lg: "text-sm px-6 py-3",
};

export default function Button({
  children,
  variant = "fill",
  href,
  external,
  onClick,
  type = "button",
  className = "",
  size = "md",
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
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
