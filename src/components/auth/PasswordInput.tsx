import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import clsx from "clsx";
import { forwardRef, useState } from "react";

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
  error?: string;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ id, label = "Password", error, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="space-y-1">
        <Label htmlFor={id} className="text-[rgb(39,68,124)]">
          {label}
        </Label>
        <div className="relative">
          <Input
            id={id}
            type={showPassword ? "text" : "password"}
            ref={ref}
            placeholder={label}
            {...props}
            className={clsx(
              "mt-1 pr-10 border-[rgb(39,68,124)] focus:ring-2 focus:ring-[rgb(73,163,90)]",
              props.className,
              error && "border-red-500 focus:ring-red-200"
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
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
