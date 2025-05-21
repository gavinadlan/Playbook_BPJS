"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import clsx from "clsx";

interface PasswordInputProps {
  id?: string;
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export default function PasswordInput({
  id,
  label = "Password",
  value,
  onChange,
  name = "password",
  placeholder = "Enter your password",
  required = true,
  className,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-1">
      <Label htmlFor={id || name} className="text-[rgb(39,68,124)]">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id || name}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          name={name}
          placeholder={placeholder}
          required={required}
          className={clsx(
            "mt-1 pr-10 border-[rgb(39,68,124)] focus:ring-2 focus:ring-[rgb(73,163,90)]",
            className
          )}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground"
          onClick={() => setShowPassword((prev) => !prev)}
          tabIndex={-1}
        >
          {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
        </button>
      </div>
    </div>
  );
}
