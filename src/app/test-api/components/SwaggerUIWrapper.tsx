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
  targetPath?: string;
  targetMethod?: string;
}

export default function SwaggerUIWrapper(props: SwaggerUIWrapperProps) {
  const { targetPath, targetMethod, ...swaggerProps } = props;

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

  // Function to scroll to specific endpoint
  useEffect(() => {
    if (!targetPath || !targetMethod) return;

    const scrollToEndpoint = () => {
      // Wait for Swagger UI to load
      const checkForSwaggerUI = setInterval(() => {
        const swaggerContainer = document.querySelector('.swagger-ui');
        if (!swaggerContainer) return;

        // Find all operation containers
        const operations = swaggerContainer.querySelectorAll('.opblock');
        
        for (let i = 0; i < operations.length; i++) {
          const operation = operations[i];
          const methodElement = operation.querySelector('.opblock-summary-method');
          const pathElement = operation.querySelector('.opblock-summary-path');
          
          if (methodElement && pathElement) {
            const method = methodElement.textContent?.trim();
            const path = pathElement.textContent?.trim();
            
            // Check if this is the target endpoint
            if (method?.toLowerCase() === targetMethod.toLowerCase() && 
                path === targetPath) {
              
              // Expand the operation if collapsed
              const toggleButton = operation.querySelector('.opblock-summary');
              if (toggleButton) {
                (toggleButton as HTMLElement).click();
              }
              
              // Scroll to the operation
              operation.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
              });
              
              // Add highlight effect
              (operation as HTMLElement).style.transition = 'all 0.3s ease';
              (operation as HTMLElement).style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.5)';
              (operation as HTMLElement).style.borderRadius = '4px';
              
              setTimeout(() => {
                (operation as HTMLElement).style.boxShadow = '';
              }, 2000);
              
              clearInterval(checkForSwaggerUI);
              return;
            }
          }
        }
      }, 500);

      // Clear interval after 10 seconds to avoid infinite checking
      setTimeout(() => {
        clearInterval(checkForSwaggerUI);
      }, 10000);
    };

    // Delay to ensure Swagger UI has loaded
    const timeout = setTimeout(scrollToEndpoint, 2000);
    
    return () => {
      clearTimeout(timeout);
    };
  }, [targetPath, targetMethod]);

  return (
    <div className="swagger-container">
      <SwaggerUI {...swaggerProps} />
    </div>
  );
} 