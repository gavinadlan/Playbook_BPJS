'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import untuk Swagger UI
const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

interface SwaggerUIWrapperProps {
  url: string;
  docExpansion?: "list" | "full" | "none";
  defaultModelsExpandDepth?: number;
  defaultModelExpandDepth?: number;
  tryItOutEnabled?: boolean;
  requestInterceptor?: (request: any) => any;
  responseInterceptor?: (response: any) => any;
}

export default function SwaggerUIWrapper(props: SwaggerUIWrapperProps) {
  useEffect(() => {
    // Suppress console errors untuk Swagger UI warnings
    const originalError = console.error;
    console.error = (...args) => {
      // Filter out Swagger UI specific warnings
      const message = args[0];
      if (typeof message === 'string' && 
          (message.includes('UNSAFE_componentWillReceiveProps') || 
           message.includes('ModelCollapse') ||
           message.includes('OperationContainer') ||
           message.includes('ContentType') ||
           message.includes('ParameterRow') ||
           message.includes('RequestBodyEditor'))) {
        return; // Suppress these warnings
      }
      originalError.apply(console, args);
    };

    // Hide only the element that is exactly the YAML path (not other info)
    const interval = setInterval(() => {
      const infoContainer = document.querySelector('.swagger-ui .information-container');
      if (infoContainer) {
        const walker = document.createTreeWalker(infoContainer, NodeFilter.SHOW_ELEMENT, null);
        let found = false;
        let node = walker.currentNode as HTMLElement | null;
        while (node) {
          // Sembunyikan hanya jika text-nya persis path yaml (diawali /api-docs/ dan diakhiri .yaml, dan tidak ada spasi lain)
          const text = node.textContent?.trim() || '';
          if (
            text.startsWith('/api-docs/') &&
            text.endsWith('.yaml') &&
            text.length < 100 // path yaml biasanya pendek, deskripsi panjang
          ) {
            node.style.display = 'none';
            found = true;
          }
          node = walker.nextNode() as HTMLElement | null;
        }
        // Jika sudah tidak ada yang persis path yaml, clear interval
        const stillExists = Array.from(infoContainer.querySelectorAll('*')).some(
          el => {
            const t = el.textContent?.trim() || '';
            return t.startsWith('/api-docs/') && t.endsWith('.yaml') && t.length < 100;
          }
        );
        if (!stillExists) {
          clearInterval(interval);
        }
      }
    }, 200);

    return () => {
      console.error = originalError;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="swagger-container">
      <SwaggerUI {...props} />
    </div>
  );
} 