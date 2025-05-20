import { ReactNode } from "react";

export default function AuthLayout({
  titleLeft,
  descLeft,
  children,
}: {
  titleLeft: string;
  descLeft: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Panel kiri */}
      <div
        className="hidden lg:block w-1/2 bg-gradient-to-br from-[rgb(39,68,124)] to-[rgb(73,163,90)]"
        style={{
          background:
            "linear-gradient(135deg, rgba(39,68,124,1) 0%, rgba(73,163,90,1) 100%)",
        }}
      >
        <div className="h-full flex items-center justify-center p-12">
          <div className="text-white text-center">
            <h2 className="text-4xl font-bold mb-4">{titleLeft}</h2>
            <p className="text-xl">{descLeft}</p>
          </div>
        </div>
      </div>

      {/* Panel kanan */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">{children}</div>
      </div>
    </div>
  );
}
