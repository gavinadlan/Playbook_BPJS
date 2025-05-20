"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FAQ_DATA } from "@/lib/mock-data";
import FaqList from "@/components/faq/FaqList";
import Banner from "@/components/Banner";

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleIndex = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div>
      {/* Banner */}
      <Banner
        imageUrl="https://img.freepik.com/free-vector/gradient-faq-banner-template_23-2149382422.jpg"
        title="Frequently Asked Questions"
        description="Temukan jawaban atas pertanyaan umum seputar layanan dan produk kami."
      />

      {/* Content FAQ */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="max-w-md mx-auto mb-8 relative">
          <input
            type="text"
            placeholder="Cari FAQ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 ring-[#27447C]/50 outline-none transition-all"
          />
          <motion.div className="absolute top-3 left-3 text-gray-400">
            🔍
          </motion.div>
        </div>

        <FaqList
          data={FAQ_DATA}
          openIndex={openIndex}
          toggleIndex={toggleIndex}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
    </div>
  );
}
