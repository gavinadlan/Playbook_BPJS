"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface EmailInputProps {
  id?: string;
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export default function EmailInput({
  id = "email",
  label = "Email",
  value,
  onChange,
  name = "email",
  placeholder = "Enter your email",
  required = true,
  className,
}: EmailInputProps) {
  return (
    <div className="space-y-1">
      <Label htmlFor={id} className="text-[rgb(39,68,124)]">
        {label}
      </Label>
      <Input
        id={id}
        type="email"
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        required={required}
        className={`mt-1 border-[rgb(39,68,124)] focus:ring-2 focus:ring-[rgb(73,163,90)] ${className}`}
      />
    </div>
  );
}
