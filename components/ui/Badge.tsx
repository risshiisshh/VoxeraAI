type Variant = "amber" | "blue" | "success" | "muted";

interface BadgeProps {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}

const variantMap: Record<Variant, string> = {
  amber:   "badge-amber",
  blue:    "badge-blue",
  success: "badge-success",
  muted:   "badge text-[#4A5A7A] bg-white/[0.04]",
};

export default function Badge({ children, variant = "amber", className = "" }: BadgeProps) {
  return (
    <span className={`badge ${variantMap[variant]} ${className}`}>
      {children}
    </span>
  );
}
