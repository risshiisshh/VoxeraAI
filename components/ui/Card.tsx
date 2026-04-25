import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
  hover?: boolean;
  padding?: string;
}

export default function Card({
  children,
  className  = "",
  active     = false,
  hover      = true,
  padding    = "p-6",
}: CardProps) {
  return (
    <div
      className={`card ${padding} ${active ? "card-active" : ""} ${
        !hover ? "hover:transform-none hover:shadow-none" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
