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

    return () => {
      console.error = originalError;
    };
  }, []);

  return (
    <div className="swagger-container">
      <SwaggerUI {...props} />
    </div>
  );
} 