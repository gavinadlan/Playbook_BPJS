'use client';

import { Suspense } from 'react';
import ProtectedTestApi from '@/components/test-api/ProtectedTestApi';
import SearchSidebar from '@/components/test-api/SearchSidebar';
import ApiDocumentation from '@/components/test-api/ApiDocumentation';
import { useTestApi } from '@/hooks/useTestApi';
import Loader from '@/components/ui/loading';

// Import CSS untuk Swagger UI
import 'swagger-ui-react/swagger-ui.css';
import './swagger-custom.css';

function TestApiContent() {
  const {
    // State
    selectedService,
    swaggerUrl,
    searchEndpoint,
    allEndpoints,
    searchResults,
    loadingEndpoints,
    sidebarOpen,
    groupedResults,
    currentService,
    pathParam,
    methodParam,
    
    // Actions
    updateState,
    handleServiceChange,
    handleEndpointClick,
  } = useTestApi();

  const handleSearchChange = (value: string) => {
    updateState({ searchEndpoint: value });
  };

  const handleSidebarToggle = () => {
    updateState({ sidebarOpen: !sidebarOpen });
  };

  return (
    <ProtectedTestApi>
      <div className="container mx-auto px-2 md:px-4 py-8 pb-20">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Test API BPJS Kesehatan</h1>
          <p className="text-gray-600 text-sm md:text-base">
            Test dan eksplorasi API BPJS Kesehatan secara langsung menggunakan Swagger UI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8">
          {/* Sidebar */}
          <SearchSidebar
            searchEndpoint={searchEndpoint}
            onSearchChange={handleSearchChange}
            loadingEndpoints={loadingEndpoints}
            searchResults={searchResults}
            groupedResults={groupedResults}
            selectedService={selectedService}
            onServiceChange={handleServiceChange}
            onEndpointClick={handleEndpointClick}
            sidebarOpen={sidebarOpen}
            onSidebarToggle={handleSidebarToggle}
          />

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-4 md:space-y-6">
            <ApiDocumentation
              swaggerUrl={swaggerUrl}
              currentService={currentService}
              searchEndpoint={searchEndpoint}
              searchResults={searchResults}
              pathParam={pathParam || undefined}
              methodParam={methodParam || undefined}
            />
          </main>
        </div>
      </div>
    </ProtectedTestApi>
  );
}

export default function TestApiPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    }>
      <TestApiContent />
    </Suspense>
  );
} 