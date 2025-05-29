"use client";

import FaqItem from "./FaqItem";

interface Faq {
  question: string;
  answer: string;
}

interface FaqListProps {
  data: Faq[];
  openIndex: number | null;
  toggleIndex: (index: number) => void;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
}

export default function FaqList({
  data,
  openIndex,
  toggleIndex,
  searchTerm,
}: FaqListProps) {
  const filteredFaqs = data.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {filteredFaqs.map((faq, idx) => (
        <FaqItem
          key={idx}
          question={faq.question}
          answer={faq.answer}
          isOpen={openIndex === idx}
          onToggle={() => toggleIndex(idx)}
        />
      ))}
    </div>
  );
}
