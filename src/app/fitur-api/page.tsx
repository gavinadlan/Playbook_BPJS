"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { API_CATEGORIES } from "@/lib/mock-data";
import ApiCategoryList from "@/components/fitur-api/ApiCategoryList";
import Banner from "@/components/Banner";

export default function FiturApiPage() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleCategory = (categoryName: string) => {
    setOpenCategory((prev) => (prev === categoryName ? null : categoryName));
  };

  return (
    <div>
      {/* Banner */}
      <Banner
        imageUrl="https://png.pngtree.com/thumb_back/fh260/back_our/20190620/ourmid/pngtree-blue-digital-technology-electronic-banner-image_168524.jpg"
        title="Dokumentasi API"
        description="Integrasikan sistem kesehatan nasional dengan API modern dan aman dari BPJS Kesehatan."
      />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
        <ApiCategoryList
          categories={API_CATEGORIES}
          openCategory={openCategory}
          toggleCategory={toggleCategory}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
    </div>
  );
}
