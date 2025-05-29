"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, X } from "lucide-react";

export default function Alert({
  type,
  message,
  onClose,
}: {
  type: "success" | "error";
  message: string;
  onClose: () => void;
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-md shadow-lg flex items-center space-x-4 ${
        type === "success"
          ? "bg-green-100 border border-green-200"
          : "bg-red-100 border border-red-200"
      }`}
    >
      {type === "success" ? (
        <CheckCircle2 className="w-6 h-6 text-green-600" />
      ) : (
        <XCircle className="w-6 h-6 text-red-600" />
      )}
      <p className={type === "success" ? "text-green-600" : "text-red-600"}>
        {message}
      </p>
      <button
        onClick={() => {
          setVisible(false);
          onClose();
        }}
        className="ml-4"
      >
        <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
      </button>
    </div>
  );
}
