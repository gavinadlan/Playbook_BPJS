'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Loader from '@/components/ui/loading';

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
  searchEndpoint?: string; // Tambahkan prop searchEndpoint
}

function SwaggerUIWrapper(props: SwaggerUIWrapperProps) {
  const { targetPath, targetMethod, searchEndpoint, ...swaggerProps } = props;
  const [isLoading, setIsLoading] = useState(true);

  // Reset loading state when URL changes
  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 detik, adjust jika perlu
    return () => clearTimeout(timeout);
  }, [props.url]);

  // Function to scroll to specific endpoint (by path & method)
  useEffect(() => {
    if (!searchEndpoint) return;
    const scrollToSearchedEndpoint = () => {
      const swaggerContainer = document.querySelector('.swagger-ui');
      if (!swaggerContainer) return;
      const operations = swaggerContainer.querySelectorAll('.opblock');
      let found = false;
      for (let i = 0; i < operations.length; i++) {
        const operation = operations[i];
        const methodElement = operation.querySelector('.opblock-summary-method');
        const pathElement = operation.querySelector('.opblock-summary-path');
        if (methodElement && pathElement) {
          const method = methodElement.textContent?.trim() || '';
          const path = pathElement.textContent?.trim() || '';
          if (
            path.toLowerCase().includes(searchEndpoint.toLowerCase()) ||
            method.toLowerCase().includes(searchEndpoint.toLowerCase())
          ) {
            // Expand the operation if collapsed
            const toggleButton = operation.querySelector('.opblock-summary');
            if (toggleButton) {
              (toggleButton as HTMLElement).click();
            }
            // Scroll to the operation
            operation.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Highlight
            (operation as HTMLElement).style.transition = 'all 0.3s ease';
            (operation as HTMLElement).style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.5)';
            (operation as HTMLElement).style.borderRadius = '4px';
            setTimeout(() => {
              (operation as HTMLElement).style.boxShadow = '';
            }, 2000);
            found = true;
            break;
          }
        }
      }
      // Optionally, if not found, you could show a toast or message
    };
    // Delay to ensure Swagger UI has loaded
    const timeout = setTimeout(scrollToSearchedEndpoint, 2000);
    return () => clearTimeout(timeout);
  }, [searchEndpoint, props.url]);

  // Function to scroll to specific endpoint (by path & method, for deep link)
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
    <div className="swagger-container relative" style={{ minHeight: '60vh' }}>
      <style>{`
        .swagger-ui .loading-container,
        .swagger-ui .loading-container .loading {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none !important;
          position: absolute !important;
          z-index: -1 !important;
        }
      `}</style>
      {/* Overlay hanya di area Swagger UI */}
      {isLoading && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'white',
          zIndex: 99,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Loader />
        </div>
      )}
      <SwaggerUI {...swaggerProps} />
    </div>
  );
}

export default React.memo(SwaggerUIWrapper, (prev, next) => prev.url === next.url); 