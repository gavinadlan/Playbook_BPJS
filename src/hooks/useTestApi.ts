import { useState, useEffect, useMemo } from 'react';
import * as jsyaml from 'js-yaml';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { ApiEndpoint, ApiService, TestApiState } from '@/types/api';
import { API_CONFIG, API_SERVICES } from '@/lib/constants';

export const useTestApi = () => {
  const [state, setState] = useState<TestApiState>({
    selectedService: API_CONFIG.DEFAULT_SERVICE,
    swaggerUrl: API_CONFIG.DEFAULT_SWAGGER_URL,
    searchEndpoint: '',
    allEndpoints: [],
    searchResults: [],
    loadingEndpoints: false,
    sidebarOpen: true,
  });

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // URL parameter handlers
  const apiParam = searchParams.get('api');
  const pathParam = searchParams.get('path');
  const methodParam = searchParams.get('method');

  // Update state helper
  const updateState = (updates: Partial<TestApiState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  // Handle URL parameter changes
  useEffect(() => {
    if (apiParam) {
      const match = API_SERVICES.find(s => 
        s.name.toLowerCase().includes(apiParam.toLowerCase())
      );
      if (match) {
        updateState({
          selectedService: match.name.toLowerCase(),
          swaggerUrl: match.file,
        });
      }
    }
  }, [apiParam]);

  // Fetch all endpoints from YAML files
  useEffect(() => {
    const fetchAllEndpoints = async () => {
      updateState({ loadingEndpoints: true });
      const endpoints: ApiEndpoint[] = [];

      for (const service of API_SERVICES) {
        try {
          const res = await fetch(service.file);
          if (!res.ok) continue;
          
          const yamlText = await res.text();
          const spec = jsyaml.load(yamlText) as any;
          
          if (spec?.paths) {
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
        } catch (error) {
          console.error(`Error fetching ${service.file}:`, error);
        }
      }

      updateState({ 
        allEndpoints: endpoints,
        loadingEndpoints: false 
      });
    };

    fetchAllEndpoints();
  }, []);

  // Search logic
  useEffect(() => {
    if (!state.searchEndpoint) {
      updateState({ searchResults: [] });
      return;
    }

    const query = state.searchEndpoint.toLowerCase();
    const results = state.allEndpoints.filter(ep =>
      ep.path.toLowerCase().includes(query) ||
      ep.method.toLowerCase().includes(query) ||
      ep.summary.toLowerCase().includes(query)
    ).slice(0, API_CONFIG.SEARCH_RESULT_LIMIT);

    updateState({ searchResults: results });
  }, [state.searchEndpoint, state.allEndpoints]);

  // Group search results by service
  const groupedResults = useMemo(() => {
    if (!state.searchEndpoint) return {};
    
    const groups: Record<string, ApiEndpoint[]> = {};
    for (const ep of state.searchResults) {
      if (!groups[ep.service]) groups[ep.service] = [];
      groups[ep.service].push(ep);
    }
    return groups;
  }, [state.searchResults, state.searchEndpoint]);

  // Service change handler
  const handleServiceChange = (serviceName: string) => {
    const service = API_SERVICES.find(s => s.name.toLowerCase() === serviceName);
    if (service) {
      updateState({
        selectedService: serviceName,
        swaggerUrl: service.file,
      });

      // Update URL query parameter
      const params = new URLSearchParams(searchParams.toString());
      params.set('api', serviceName);
      router.replace(`${pathname}?${params.toString()}`);
    }
  };

  // Endpoint click handler
  const handleEndpointClick = (ep: ApiEndpoint) => {
    updateState({
      selectedService: ep.service.toLowerCase(),
      swaggerUrl: ep.serviceFile,
      searchEndpoint: '',
    });

    // Update URL
    const params = new URLSearchParams(searchParams.toString());
    params.set('api', ep.service.toLowerCase());
    router.replace(`${pathname}?${params.toString()}`);

    // Scroll to endpoint after Swagger UI loads
    setTimeout(() => {
      const event = new CustomEvent('scrollToEndpoint', {
        detail: { path: ep.path, method: ep.method }
      });
      window.dispatchEvent(event);
    }, API_CONFIG.SCROLL_DELAY);
  };

  // Get current service
  const getCurrentService = () => {
    return API_SERVICES.find(s => s.name.toLowerCase() === state.selectedService);
  };

  return {
    // State
    ...state,
    
    // Computed values
    groupedResults,
    currentService: getCurrentService(),
    
    // Actions
    updateState,
    handleServiceChange,
    handleEndpointClick,
    
    // URL params
    pathParam,
    methodParam,
  };
}; 