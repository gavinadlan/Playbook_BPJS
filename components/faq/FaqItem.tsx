"use client";

import { motion } from "framer-motion";

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export default function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: FaqItemProps) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <motion.button
        onClick={onToggle}
        className="w-full p-4 bg-white flex justify-between items-center text-left font-semibold text-gray-800 cursor-pointer"
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className={`h-6 w-6 transition-transform ${
            isOpen ? "rotate-180" : ""
          } text-gray-500`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </motion.button>

      <motion.div
        initial={false}
        animate={
          isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
        }
        transition={{ duration: 0.3 }}
        className="overflow-hidden bg-gray-50 p-4 text-gray-700"
      >
        <p>{answer}</p>
      </motion.div>
    </div>
  );
}
