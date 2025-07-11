import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert-dialog';
import { Play, Info } from 'lucide-react';
import SwaggerUIWrapper from '@/components/test-api/SwaggerUIWrapper';
import { ApiService } from '@/types/api';

interface ApiDocumentationProps {
  swaggerUrl: string;
  currentService: ApiService | undefined;
  searchEndpoint: string;
  searchResults: any[];
  pathParam?: string;
  methodParam?: string;
}

export default function ApiDocumentation({
  swaggerUrl,
  currentService,
  searchEndpoint,
  searchResults,
  pathParam,
  methodParam,
}: ApiDocumentationProps) {
  return (
    <Card className="shadow-lg border border-gray-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5" />
              API Documentation
            </CardTitle>
            <CardDescription>
              Test dan eksplorasi endpoint API secara langsung
            </CardDescription>
          </div>
          <Badge variant={currentService?.status === 'active' ? 'default' : 'secondary'}>
            {currentService?.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {currentService?.status === 'inactive' ? (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Layanan {currentService?.name} belum tersedia untuk testing. 
              Dokumentasi sedang dalam pengembangan.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="relative">
            <SwaggerUIWrapper
              key={swaggerUrl + searchEndpoint}
              url={swaggerUrl}
              docExpansion="list"
              defaultModelsExpandDepth={1}
              defaultModelExpandDepth={1}
              tryItOutEnabled={true}
              targetPath={searchResults[0]?.path || pathParam || undefined}
              targetMethod={searchResults[0]?.method || methodParam || undefined}
              searchEndpoint={searchEndpoint}
              requestInterceptor={(request: any) => {
                // Add any custom request headers here
                return request;
              }}
              responseInterceptor={(response: any) => {
                // Handle response if needed
                return response;
              }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
} 