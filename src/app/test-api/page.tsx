'use client';

import { useState, useEffect, useMemo } from 'react';
import * as jsyaml from 'js-yaml';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert-dialog';
import { Search, FileText, Info, Play, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import ProtectedTestApi from './components/ProtectedTestApi';
import SwaggerUIWrapper from './components/SwaggerUIWrapper';
// import ApiInfoCard from './components/ApiInfoCard';
// import ApiStats from './components/ApiStats';
import { useSearchParams, useRouter, usePathname } from "next/navigation";

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
  const [searchEndpoint, setSearchEndpoint] = useState<string>("");
  const [allEndpoints, setAllEndpoints] = useState<any[]>([]); // {service, path, method, summary}
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loadingEndpoints, setLoadingEndpoints] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const searchParams = useSearchParams();
  const apiParam = searchParams.get("api");
  const pathParam = searchParams.get("path");
  const methodParam = searchParams.get("method");
  const router = useRouter();
  const pathname = usePathname();

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

  // Fetch all endpoints from all YAMLs on mount
  useEffect(() => {
    async function fetchAllEndpoints() {
      setLoadingEndpoints(true);
      const endpoints: any[] = [];
      for (const service of apiServices) {
        try {
          const res = await fetch(service.file);
          if (!res.ok) continue;
          const yamlText = await res.text();
          const spec = jsyaml.load(yamlText) as any;
          if (spec && spec.paths) {
            Object.entries(spec.paths).forEach(([path, pathObj]: [string, any]) => {
              Object.entries(pathObj).forEach(([method, methodObj]: [string, any]) => {
                endpoints.push({
                  service: service.name,
                  serviceFile: service.file,
                  path,
                  method: method.toUpperCase(),
                  summary: methodObj.summary || methodObj.description || '',
                });
              });
            });
          }
        } catch {}
      }
      setAllEndpoints(endpoints);
      setLoadingEndpoints(false);
    }
    fetchAllEndpoints();
  }, []);

  // Search logic: filter allEndpoints by searchEndpoint
  useEffect(() => {
    if (!searchEndpoint) {
      setSearchResults([]);
      return;
    }
    const q = searchEndpoint.toLowerCase();
    setSearchResults(
      allEndpoints.filter(
        (ep) =>
          ep.path.toLowerCase().includes(q) ||
          ep.method.toLowerCase().includes(q) ||
          ep.summary.toLowerCase().includes(q)
      ).slice(0, 20) // limit result
    );
  }, [searchEndpoint, allEndpoints]);

  // Group search results by service
  const groupedResults = useMemo(() => {
    if (!searchEndpoint) return {};
    const groups: Record<string, any[]> = {};
    for (const ep of searchResults) {
      if (!groups[ep.service]) groups[ep.service] = [];
      groups[ep.service].push(ep);
    }
    return groups;
  }, [searchResults, searchEndpoint]);

  // Highlight keyword in result
  function highlight(text: string, keyword: string) {
    if (!keyword) return text;
    const parts = text.split(new RegExp(`(${keyword})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <span key={i} className="bg-yellow-200 font-semibold">{part}</span>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  }

  const handleServiceChange = (serviceName: string) => {
    const service = apiServices.find(s => s.name.toLowerCase() === serviceName);
    if (service) {
      setSelectedService(serviceName);
      setSwaggerUrl(service.file);
      // Update URL query param 'api' agar pilihan tetap saat refresh
      const params = new URLSearchParams(searchParams.toString());
      params.set("api", serviceName);
      router.replace(`${pathname}?${params.toString()}`);
    }
  };

  const getCurrentService = () => {
    return apiServices.find(s => s.name.toLowerCase() === selectedService);
  };

  // Handler: klik hasil search endpoint
  const handleEndpointClick = (ep: any) => {
    setSelectedService(ep.service.toLowerCase());
    setSwaggerUrl(ep.serviceFile);
    setSearchEndpoint("");
    // Update URL agar tetap di service yang benar
    const params = new URLSearchParams(searchParams.toString());
    params.set("api", ep.service.toLowerCase());
    router.replace(`${pathname}?${params.toString()}`);
    // Pass ke SwaggerUIWrapper via targetPath/targetMethod
    // (handled by props below)
    window.setTimeout(() => {
      // Scroll ke endpoint setelah Swagger UI load
      const event = new CustomEvent('scrollToEndpoint', {
        detail: { path: ep.path, method: ep.method }
      });
      window.dispatchEvent(event);
    }, 1000);
  };

  return (
    <ProtectedTestApi>
      <div className="container mx-auto px-2 md:px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Test API BPJS Kesehatan</h1>
          <p className="text-gray-600">
            Test dan eksplorasi API BPJS Kesehatan secara langsung menggunakan Swagger UI
          </p>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className={`lg:col-span-1 relative z-20 ${sidebarOpen ? '' : 'hidden lg:block'}`}
          style={{ position: 'sticky', top: 32, alignSelf: 'flex-start', height: 'fit-content' }}>
          {/* Mobile toggle */}
          <button
            className="lg:hidden flex items-center gap-2 mb-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 font-medium shadow-sm"
            onClick={() => setSidebarOpen((v) => !v)}
          >
            {sidebarOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />} API Sidebar
          </button>

          {/* Search Endpoint (all services) */}
          <div className="mb-4 relative">
            <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-200">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search endpoint (all services)..."
                value={searchEndpoint}
                onChange={e => setSearchEndpoint(e.target.value)}
                className="w-full bg-transparent outline-none text-sm"
              />
              {searchEndpoint && (
                <button
                  onClick={() => setSearchEndpoint("")}
                  className="ml-2 px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
                >
                  Clear
                </button>
              )}
            </div>
            {/* Search Results Dropdown */}
            {searchEndpoint && (
              <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg max-h-72 overflow-auto shadow-xl z-20">
                {loadingEndpoints ? (
                  <div className="p-4 text-center text-gray-400 text-sm">Loading endpoints...</div>
                ) : searchResults.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-6 text-gray-400 text-sm">
                    <AlertCircle className="w-8 h-8 mb-2" />
                    No endpoints found
                  </div>
                ) : (
                  Object.entries(groupedResults).map(([service, endpoints]) => (
                    <div key={service}>
                      <div className="px-4 py-2 text-xs font-bold text-blue-700 bg-blue-50 border-b border-blue-100 sticky top-0 z-10">
                        {service}
                      </div>
                      {endpoints.map((ep, idx) => (
                        <div
                          key={ep.service + ep.path + ep.method + idx}
                          className="px-4 py-2 hover:bg-blue-50 cursor-pointer border-b last:border-b-0 flex flex-col gap-1"
                          onClick={() => handleEndpointClick(ep)}
                        >
                          <div className="flex items-center gap-2 text-xs text-gray-700">
                            <span className={`font-bold px-2 py-0.5 rounded ${ep.method === 'GET' ? 'bg-green-100 text-green-700' : ep.method === 'POST' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>{ep.method}</span>
                            <span className="font-mono">{highlight(ep.path, searchEndpoint)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Badge className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{ep.service}</Badge>
                            {ep.summary && <span className="text-gray-400">{highlight(ep.summary, searchEndpoint)}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <Card className="shadow-md border border-gray-200">
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
                    className={`p-3 rounded-lg border cursor-pointer transition-colors flex flex-col gap-1 ${
                      selectedService === service.name.toLowerCase()
                        ? 'bg-blue-50 border-blue-300 shadow'
                        : 'hover:bg-gray-50 border-gray-200'
                    }`}
                    onClick={() => handleServiceChange(service.name.toLowerCase())}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-sm flex items-center gap-2">
                        {service.status === 'active' ? <span className="inline-block w-2 h-2 bg-green-500 rounded-full" /> : <span className="inline-block w-2 h-2 bg-gray-400 rounded-full" />}
                        {service.name}
                      </h3>
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
          <Card className="mt-4 shadow border border-gray-200">
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
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3 space-y-6">
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
        </main>
      </div>
      </div>
    </ProtectedTestApi>
  );
} 