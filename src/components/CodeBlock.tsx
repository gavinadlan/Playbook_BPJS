"use client";

import { useState } from "react";
import { Copy, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = "json" }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightedCode = formatCode(code, language);

  return (
    <div className="relative font-mono text-sm rounded-md bg-gray-100 overflow-hidden">
      <pre className="overflow-x-auto p-4">
        <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      </pre>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-7 w-7 bg-white hover:bg-gray-200"
        onClick={copyToClipboard}
        title="Copy"
      >
        {copied ? (
          <CheckCheck className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4 text-gray-500" />
        )}
      </Button>
    </div>
  );
};

function formatCode(code: string, language: string) {
  if (language === "json") {
    return code
      .replace(/"([^"]+)":/g, '<span class="text-blue-600">"$1"</span>:')
      .replace(/: "([^"]+)"/g, ': <span class="text-green-600">"$1"</span>')
      .replace(/: (\d+)/g, ': <span class="text-purple-600">$1</span>')
      .replace(
        /: (true|false|null)/g,
        ': <span class="text-red-600">$1</span>'
      );
  }
  return code; // fallback
}

export default CodeBlock;
