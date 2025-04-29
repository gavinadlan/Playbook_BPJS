import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer"; // <-- tambahkan ini

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BPJS Kesehatan API Documentation",
  description: "API documentation platform for BPJS Kesehatan",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer /> {/* <-- Footer dipasang di sini */}
        </div>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
