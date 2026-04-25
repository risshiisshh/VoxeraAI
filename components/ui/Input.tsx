import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export default function Input({ label, error, icon, className = "", id, ...rest }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-[#8899BB]">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A5A7A]">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          className={`input-base ${icon ? "pl-10" : ""} ${
            error ? "border-[#EF4444] focus:border-[#EF4444] focus:shadow-[0_0_0_3px_rgba(239,68,68,0.12)]" : ""
          } ${className}`}
          {...rest}
        />
      </div>
      {error && <p className="text-xs text-[#EF4444]">{error}</p>}
    </div>
  );
}
