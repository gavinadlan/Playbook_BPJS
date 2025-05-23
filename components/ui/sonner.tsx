"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position="top-center"
      visibleToasts={1}
      toastOptions={{
        duration: 3000,
        classNames: {
          toast:
            "group toast group-[.toaster]:shadow-lg " +
            "fixed top-4 left-1/2 -translate-x-1/2 " +
            "min-w-[400px] p-6 rounded-xl border-0 " +
            "flex flex-col items-center justify-center gap-3 " +
            "text-lg font-semibold transition-all " +
            "backdrop:bg-black/30 backdrop:backdrop-blur-sm",
          title: "w-full text-center text-white",
          description: "text-base font-normal text-white/80",
          success: "bg-emerald-500",
          error: "bg-rose-500",
          actionButton: "!bg-white/20 !text-white hover:!bg-white/30",
          cancelButton: "!bg-white/10 !text-white hover:!bg-white/20",
          closeButton: "!bg-white/10 !text-white hover:!bg-white/20",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
