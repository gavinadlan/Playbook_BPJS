"use client";

import { useState } from "react";
import { Copy, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeBlockProps {
  code: string;
  language: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Very basic syntax highlighting
  const highlightedCode = formatCode(code, language);

  return (
    <div className="relative font-mono text-sm">
      <pre className="overflow-x-auto p-4 rounded bg-gray-50 text-gray-800">
        <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      </pre>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-7 w-7 rounded-md bg-gray-100 hover:bg-gray-200"
        onClick={copyToClipboard}
        title="Copy to clipboard"
      >
        {copied ? (
          <CheckCheck className="h-3.5 w-3.5 text-green-600" />
        ) : (
          <Copy className="h-3.5 w-3.5 text-gray-500" />
        )}
      </Button>
    </div>
  );
};

// Simple syntax highlighting function
function formatCode(code: string, language: string): string {
  if (language === "json") {
    // Highlight JSON
    return code
      .replace(/"([^"]+)":/g, '<span class="text-blue-600">"$1"</span>:')
      .replace(/: "([^"]+)"/g, ': <span class="text-green-600">"$1"</span>')
      .replace(/: (\d+)/g, ': <span class="text-purple-600">$1</span>')
      .replace(/: (true|false|null)/g, ': <span class="text-red-600">$1</span>');
  } else if (language === "bash" || language === "shell") {
    // Highlight bash/shell
    return code
      .replace(/(["'].*?["'])/g, '<span class="text-green-600">$1</span>')
      .replace(/(\-\w+)/g, '<span class="text-yellow-600">$1</span>')
      .replace(/(curl|wget)/g, '<span class="text-blue-600">$1</span>');
  } else if (language === "javascript") {
    // Highlight JavaScript
    return code
      .replace(/(const|let|var|function|async|await|return|if|else|try|catch)/g, '<span class="text-purple-600">$1</span>')
      .replace(/(\w+)\(/g, '<span class="text-blue-600">$1</span>(')
      .replace(/(["'].*?["'])/g, '<span class="text-green-600">$1</span>')
      .replace(/\b(\d+)\b/g, '<span class="text-orange-600">$1</span>');
  } else if (language === "python") {
    // Highlight Python
    return code
      .replace(/(def|import|from|as|return|if|else|try|except)/g, '<span class="text-purple-600">$1</span>')
      .replace(/(\w+)\(/g, '<span class="text-blue-600">$1</span>(')
      .replace(/(["'].*?["'])/g, '<span class="text-green-600">$1</span>')
      .replace(/\b(\d+)\b/g, '<span class="text-orange-600">$1</span>');
  } else {
    // Default highlighting
    return code;
  }
}

export default CodeBlock;