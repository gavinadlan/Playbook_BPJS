'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert-dialog';
import { Info, Play, FileText } from 'lucide-react';
import ProtectedTestApi from './components/ProtectedTestApi';
import SwaggerUIWrapper from './components/SwaggerUIWrapper';
// import ApiInfoCard from './components/ApiInfoCard';
// import ApiStats from './components/ApiStats';
import { useSearchParams } from "next/navigation";

// Import CSS untuk Swagger UI
import 'swagger-ui-react/swagger-ui.css';
import './swagger-custom.css';

interface ApiService {
  name: string;
  file: string;
  description: string;
  status: 'active' | 'inactive';
}

const apiServices: ApiService[] = [
  {
    name: 'BPJS Kesehatan API',
    file: '/api-docs/bpjs-kesehatan.yaml',
    description: 'Dokumentasi lengkap semua layanan BPJS Kesehatan',
    status: 'active'
  },
  {
    name: 'Aplicares',
    file: '/api-docs/services/aplicares.yaml',
    description: 'Layanan Aplicares untuk manajemen aplikasi',
    status: 'active'
  },
  {
    name: 'VClaim',
    file: '/api-docs/services/vclaim/merged.yaml',
    description: 'Layanan VClaim untuk klaim asuransi',
    status: 'active'
  },
  {
    name: 'AntreanRS',
    file: '/api-docs/services/antreanrs/merged.yaml',
    description: 'Layanan Antrean Rumah Sakit',
    status: 'active'
  },
  {
    name: 'Apotek',
    file: '/api-docs/services/apotek/merged.yaml',
    description: 'Layanan Apotek',
    status: 'active'
  },
  {
    name: 'PCare',
    file: '/api-docs/services/pcare/merged.yaml',
    description: 'Layanan PCare',
    status: 'active'
  },
  {
    name: 'AntreanFKTP',
    file: '/api-docs/services/antreanfktp/merged.yaml',
    description: 'Layanan Antrean FKTP',
    status: 'active'
  },
  {
    name: 'i-Care',
    file: '/api-docs/services/icare/merged.yaml',
    description: 'Layanan i-Care JKN',
    status: 'active'
  },
  {
    name: 'RekamMedis',
    file: '/api-docs/services/rekammedis/merged.yaml',
    description: 'Layanan eRekam Medis',
    status: 'active'
  }
];

export default function TestApiPage() {
  const [selectedService, setSelectedService] = useState<string>('bpjs kesehatan api');
  const [swaggerUrl, setSwaggerUrl] = useState<string>('/api-docs/bpjs-kesehatan.yaml');

  const searchParams = useSearchParams();
  const apiParam = searchParams.get("api");
  const pathParam = searchParams.get("path");
  const methodParam = searchParams.get("method");

  useEffect(() => {
    if (apiParam) {
      // Cari nama service yang cocok (case-insensitive, bisa mapping jika perlu)
      const match = apiServices.find(s => s.name.toLowerCase().includes(apiParam.toLowerCase()));
      if (match) {
        setSelectedService(match.name.toLowerCase());
        setSwaggerUrl(match.file);
      }
    }
  }, [apiParam]);

  useEffect(() => {
    if (pathParam && methodParam) {
      // Scroll functionality is now handled in SwaggerUIWrapper component
    }
  }, [swaggerUrl, pathParam, methodParam]);

  const handleServiceChange = (serviceName: string) => {
    const service = apiServices.find(s => s.name.toLowerCase() === serviceName);
    if (service) {
      setSelectedService(serviceName);
      setSwaggerUrl(service.file);
    }
  };

  const getCurrentService = () => {
    return apiServices.find(s => s.name.toLowerCase() === selectedService);
  };

  return (
    <ProtectedTestApi>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Test API BPJS Kesehatan</h1>
          <p className="text-gray-600">
            Test dan eksplorasi API BPJS Kesehatan secara langsung menggunakan Swagger UI
          </p>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                API Services
              </CardTitle>
              <CardDescription>
                Pilih layanan API yang ingin diuji
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {apiServices.map((service) => (
                  <div
                    key={service.name}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedService === service.name.toLowerCase()
                        ? 'bg-blue-50 border-blue-200'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleServiceChange(service.name.toLowerCase())}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-sm">{service.name}</h3>
                      <Badge 
                        variant={service.status === 'active' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {service.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600">{service.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Informasi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm mb-1">Server Development</h4>
                  <p className="text-xs text-gray-600">
                    https://apijkn-dev.bpjs-kesehatan.go.id
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-1">Status Layanan</h4>
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className="text-xs">Active</Badge>
                    <span className="text-xs text-gray-600">- Siap untuk testing</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">Inactive</Badge>
                    <span className="text-xs text-gray-600">- Belum tersedia</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* API Info Card - Temporarily disabled */}
          {/* <ApiInfoCard
            title={`${getCurrentService()?.name} API`}
            description={getCurrentService()?.description || ''}
            baseUrl="https://apijkn-dev.bpjs-kesehatan.go.id"
            version="1.0.0"
            status={getCurrentService()?.status || 'inactive'}
            endpoints={getCurrentService()?.name === 'BPJS Kesehatan API' ? 60 : getCurrentService()?.name === 'Aplicares' ? 15 : getCurrentService()?.name === 'VClaim' ? 25 : 0}
            onCopyUrl={() => {
              // Handle copy URL
            }}
          />

          <ApiStats
            totalServices={9}
            activeServices={3}
            totalEndpoints={60}
            averageResponseTime={250}
            uptime={99.9}
          /> */}

          {/* Swagger UI */}
          <Card>
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
                <Badge variant={getCurrentService()?.status === 'active' ? 'default' : 'secondary'}>
                  {getCurrentService()?.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {getCurrentService()?.status === 'inactive' ? (
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Layanan {getCurrentService()?.name} belum tersedia untuk testing. 
                    Dokumentasi sedang dalam pengembangan.
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="relative">
                  <SwaggerUIWrapper
                    key={swaggerUrl}
                    url={swaggerUrl}
                    docExpansion="list"
                    defaultModelsExpandDepth={1}
                    defaultModelExpandDepth={1}
                    tryItOutEnabled={true}
                    targetPath={pathParam || undefined}
                    targetMethod={methodParam || undefined}
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
        </div>
      </div>
      </div>
    </ProtectedTestApi>
  );
} 