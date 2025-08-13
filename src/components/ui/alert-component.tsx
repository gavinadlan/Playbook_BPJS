import React from "react";

interface AlertProps {
  variant?: "default" | "destructive";
  children: React.ReactNode;
  className?: string;
}

interface AlertDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({ 
  variant = "default", 
  children, 
  className = "" 
}) => {
  const baseClasses = "relative w-full rounded-lg border p-4";
  const variantClasses = {
    default: "bg-background text-foreground border-gray-200",
    destructive: "border-red-200 bg-red-50 text-red-800"
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
};

export const AlertDescription: React.FC<AlertDescriptionProps> = ({ 
  children, 
  className = "" 
}) => {
  return (
    <div className={`text-sm [&_p]:leading-relaxed ${className}`}>
      {children}
    </div>
  );
};
