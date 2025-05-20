"use client";

import { motion } from "framer-motion";

interface BannerProps {
  imageUrl: string;
  title: string;
  description: string;
}

export default function Banner({ imageUrl, title, description }: BannerProps) {
  return (
    <div className="w-full relative h-96 bg-gray-900">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover object-center opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-gray-900/40" />
      </div>
      <div className="relative max-w-7xl mx-auto h-full px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {title}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            {description}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
