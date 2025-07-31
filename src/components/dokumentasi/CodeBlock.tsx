import React from "react";
import CopyButton from "./CopyButton";

interface CodeExample {
  language: string;
  code: string;
}

interface CodeBlockProps {
  title: string;
  stepNumber: number;
  examples: CodeExample[];
  className?: string;
}

export default function CodeBlock({ 
  title, 
  stepNumber, 
  examples, 
  className = "" 
}: CodeBlockProps) {
  const [selectedLang, setSelectedLang] = React.useState(
    examples.length > 0 ? examples[0].language : null
  );

  const selectedCode = examples.find(ex => ex.language === selectedLang)?.code || "";

  return (
    <div className={`mb-6 ${className}`}>
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-[rgb(73,163,90)] flex items-center gap-2">
          <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full flex items-center justify-center text-xs">
            {stepNumber}
          </span>
          {title}
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {examples.map((ex) => (
            <button
              key={ex.language}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedLang === ex.language
                  ? 'bg-[rgb(39,68,124)] text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedLang(ex.language)}
              type="button"
            >
              {ex.language}
            </button>
          ))}
        </div>
      </div>
      
      <div className="bg-gray-900 rounded-lg overflow-hidden relative">
        <CopyButton text={selectedCode} />
        {examples.map((ex) =>
          ex.language === selectedLang ? (
            <pre 
              key={ex.language} 
              className="p-4 text-xs text-green-400 font-mono whitespace-pre-wrap overflow-x-auto"
            >
              {ex.code}
            </pre>
          ) : null
        )}
      </div>
    </div>
  );
} 