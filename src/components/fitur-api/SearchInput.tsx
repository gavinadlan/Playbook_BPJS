"use client";

import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Cari Kategori...",
}: SearchInputProps) {
  return (
    <div className="relative w-full md:w-96">
      <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 ring-[#27447C]/50 outline-none transition-all bg-white"
      />
    </div>
  );
}
