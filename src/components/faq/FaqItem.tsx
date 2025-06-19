"use client";

import { motion, AnimatePresence } from "framer-motion";

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
    <motion.div
      layout
      className="border border-gray-200 rounded-xl overflow-hidden"
      initial={{ borderRadius: 12 }}
    >
      <motion.button
        layout
        onClick={onToggle}
        className="w-full p-4 bg-white flex justify-between items-center text-left font-semibold text-gray-800 cursor-pointer"
        aria-expanded={isOpen}
      >
        <motion.span layout="position" className="mr-2">
          {question}
        </motion.span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, type: "spring" }}
          className="text-gray-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: "auto",
              transition: {
                height: { duration: 0.4, ease: [0.33, 1, 0.68, 1] },
                opacity: { duration: 0.3, ease: [0.33, 1, 0.68, 1] },
              },
            }}
            exit={{
              opacity: 0,
              height: 0,
              transition: {
                height: { duration: 0.3, ease: [0.33, 1, 0.68, 1] },
                opacity: { duration: 0.2, ease: [0.33, 1, 0.68, 1] },
              },
            }}
            className="bg-gray-50 px-4 text-gray-700 overflow-hidden"
          >
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="py-3"
            >
              {answer}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
