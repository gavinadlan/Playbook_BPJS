"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface EmailInputProps {
  id?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

export default function EmailInput({
  id = "email",
  label = "Email",
  placeholder = "Email",
  required = true,
}: EmailInputProps) {
  return (
    <div>
      <Label htmlFor={id} className="text-[rgb(39,68,124)]">
        {label}
      </Label>
      <Input
        id={id}
        type="email"
        placeholder={placeholder}
        className="mt-1 border-[rgb(39,68,124)] focus:ring-2 focus:ring-[rgb(73,163,90)]"
        required={required}
      />
    </div>
  );
}
