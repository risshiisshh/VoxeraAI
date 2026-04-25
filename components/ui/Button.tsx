import React from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size    = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  children: React.ReactNode;
}

const sizeMap: Record<Size, string> = {
  sm: "text-sm py-2 px-4",
  md: "py-3 px-7",
  lg: "text-lg py-4 px-8",
};

export default function Button({
  variant = "primary",
  size    = "md",
  loading = false,
  children,
  className = "",
  disabled,
  ...rest
}: ButtonProps) {
  const base = variant === "primary"
    ? "btn-primary"
    : variant === "secondary"
    ? "btn-secondary"
    : "btn-ghost";

  return (
    <button
      className={`${base} ${sizeMap[size]} ${className}`}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="60" strokeDashoffset="20" />
          </svg>
          Loading…
        </span>
      ) : children}
    </button>
  );
}
