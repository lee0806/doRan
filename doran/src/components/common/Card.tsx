interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg" | "none";
  shadow?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({
  children,
  className = "",
  padding = "md",
  shadow = "sm",
  hover = false,
  onClick,
}: CardProps) {
  const baseStyles =
    "bg-white rounded-xl border border-[var(--border-light)] transition-all duration-200";

  const paddings = {
    none: "",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  const shadows = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
  };

  const hoverClass = hover
    ? "hover:shadow-md hover:scale-[1.02] cursor-pointer"
    : "";
  const clickableClass = onClick ? "cursor-pointer" : "";

  return (
    <div
      className={`${baseStyles} ${paddings[padding]} ${shadows[shadow]} ${hoverClass} ${clickableClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
