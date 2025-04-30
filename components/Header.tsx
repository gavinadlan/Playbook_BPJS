"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 left-0 w-full z-50 bg-white border-b border-gray-200">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex-shrink-0">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo.svg"
              alt="BPJS Kesehatan Logo"
              width={120}
              height={32}
              className="h-8 w-auto"
            />
          </Link>
        </div>

        <div className="flex-1 max-w-2xl mx-auto px-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Cari dokumentasi..."
              className="pl-8 pr-4 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-shrink-0 w-[120px]" />
      </div>
    </header>
  );
};

export default Header;
