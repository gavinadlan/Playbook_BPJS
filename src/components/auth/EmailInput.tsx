import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { forwardRef } from "react";

interface EmailInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
  error?: string;
}

const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(
  ({ id = "email", label = "Email", error, ...props }, ref) => {
    return (
      <div className="space-y-1">
        <Label htmlFor={id} className="text-[rgb(39,68,124)]">
          {label}
        </Label>
        <Input
          id={id}
          type="email"
          ref={ref}
          placeholder={label}
          {...props}
          className={`mt-1 border-[rgb(39,68,124)] focus:ring-2 focus:ring-[rgb(73,163,90)] ${
            error ? "border-red-500 focus:ring-red-200" : ""
          } ${props.className}`}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

EmailInput.displayName = "EmailInput";

export default EmailInput;
