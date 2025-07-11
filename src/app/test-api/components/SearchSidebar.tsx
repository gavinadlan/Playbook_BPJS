import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, FileText, Info, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { ApiEndpoint, ApiService } from '@/types/api';
import { API_SERVICES } from '@/lib/constants';


interface SearchSidebarProps {
  searchEndpoint: string;
  onSearchChange: (value: string) => void;
  loadingEndpoints: boolean;
  searchResults: ApiEndpoint[];
  groupedResults: Record<string, ApiEndpoint[]>;
  selectedService: string;
  onServiceChange: (serviceName: string) => void;
  onEndpointClick: (ep: ApiEndpoint) => void;
  sidebarOpen: boolean;
  onSidebarToggle: () => void;
}

export default function SearchSidebar({
  searchEndpoint,
  onSearchChange,
  loadingEndpoints,
  searchResults,
  groupedResults,
  selectedService,
  onServiceChange,
  onEndpointClick,
  sidebarOpen,
  onSidebarToggle,
}: SearchSidebarProps) {
  return (
    <aside 
      className={`lg:col-span-1 relative z-20 ${sidebarOpen ? '' : 'hidden lg:block'}`}
      style={{ position: 'sticky', top: 32, alignSelf: 'flex-start', height: 'fit-content' }}
    >
      {/* Mobile toggle */}
      <button
        className="lg:hidden flex items-center gap-2 mb-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 font-medium shadow-sm"
        onClick={onSidebarToggle}
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
            onChange={e => onSearchChange(e.target.value)}
            className="w-full bg-transparent outline-none text-sm"
          />
          {searchEndpoint && (
            <button
              onClick={() => onSearchChange("")}
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
                      onClick={() => onEndpointClick(ep)}
                    >
                      <div className="flex items-center gap-2 text-xs text-gray-700">
                        <span className={`font-bold px-2 py-0.5 rounded ${ep.method === 'GET' ? 'bg-green-100 text-green-700' : ep.method === 'POST' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                          {ep.method}
                        </span>
                        <span className="font-mono">{ep.path}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Badge className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                          {ep.service}
                        </Badge>
                        {ep.summary && (
                          <span className="text-gray-400">
                            {ep.summary}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* API Services Card */}
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
            {API_SERVICES.map((service) => (
              <div
                key={service.name}
                className={`p-3 rounded-lg border cursor-pointer transition-colors flex flex-col gap-1 ${
                  selectedService === service.name.toLowerCase()
                    ? 'bg-blue-50 border-blue-300 shadow'
                    : 'hover:bg-gray-50 border-gray-200'
                }`}
                onClick={() => onServiceChange(service.name.toLowerCase())}
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-sm flex items-center gap-2">
                    {service.status === 'active' ? (
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full" />
                    ) : (
                      <span className="inline-block w-2 h-2 bg-gray-400 rounded-full" />
                    )}
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
  );
} 