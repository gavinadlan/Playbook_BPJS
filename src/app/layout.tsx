import { useEffect, useState } from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import GlobalLoader from "@/components/GlobalLoader";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BPJS Kesehatan Dokumentasi API",
  description: "Platform dokumentasi API BPJS Kesehatan yang menyediakan referensi, panduan integrasi, dan contoh penggunaan untuk berbagai layanan digital BPJS Kesehatan.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalLoader />
        <AuthProvider>
          <ClientLayoutWrapper>
            <>
              <ConditionalHeader />
              <main className="flex-grow">{children}</main>
              <ConditionalFooter />
              <Toaster
                position="top-center"
                duration={2500}
                closeButton
                visibleToasts={1}
                expand={false}
              />
            </>
          </ClientLayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}

function ConditionalHeader() {
  return (
    <div className="non-admin-header">
      <Header />
    </div>
  );
}

function ConditionalFooter() {
  return (
    <div className="non-admin-footer">
      <Footer />
    </div>
  );
}
