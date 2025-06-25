import * as jsyaml from "js-yaml";

export interface ApiCategory {
  id: string;
  name: string;
  description: string;
}

export interface ApiParameter {
  name: string;
  in: "query" | "header" | "path" | "cookie";
  description?: string;
  required?: boolean;
  schema: {
    type: string;
    format?: string;
    example?: any;
    enum?: string[];
  };
}

export interface ApiEndpoint {
  id: string;
  name: string;
  method: string;
  path: string;
  description: string;
  parameters: ApiParameter[];
  requestExample?: any;
  responseExample?: any;
}

const CATEGORY_FILE_MAP: Record<string, string> = {
  aplicares: "aplicares",
  vclaim: "vclaim",
  antreanrs: "antreanrs",
  apotek: "apotek",
  pcare: "pcare",
  antreanfktp: "antreanfktp",
  "i-care": "icare",
  rekammedis: "rekammedis",
};

const apiDataCache: Record<string, any> = {};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes cache

export async function loadApiCategories(): Promise<ApiCategory[]> {
  // Check cache validity
  if (
    apiDataCache.categories &&
    Date.now() - apiDataCache.categoriesTimestamp < CACHE_TTL
  ) {
    return apiDataCache.categories;
  }

  try {
    const response = await fetch("/api-docs/bpjs-kesehatan.yaml");
    if (!response.ok) {
      throw new Error(`Failed to fetch YAML: ${response.status}`);
    }

    const yamlText = await response.text();
    const spec = jsyaml.load(yamlText) as any;

    if (!spec || !spec.tags) {
      throw new Error("Invalid YAML structure: missing 'tags'");
    }

    const categories: ApiCategory[] = spec.tags.map((tag: any) => {
      const id = tag.name.toLowerCase().replace(/\s+/g, "-");
      return {
        id,
        name: tag.name,
        description: tag.description || "",
      };
    });

    // Update cache with timestamp
    apiDataCache.categories = categories;
    apiDataCache.categoriesTimestamp = Date.now();

    return categories;
  } catch (error) {
    console.error("Error loading API categories:", error);
    return [];
  }
}

export async function loadEndpointsForCategory(
  categoryId: string
): Promise<ApiEndpoint[]> {
  const cacheKey = `endpoints-${categoryId}`;

  // Check cache validity
  if (
    apiDataCache[cacheKey] &&
    Date.now() - apiDataCache[`${cacheKey}-timestamp`] < CACHE_TTL
  ) {
    return apiDataCache[cacheKey];
  }

  try {
    const fileName = CATEGORY_FILE_MAP[categoryId] || categoryId;
    const response = await fetch(`/api-docs/services/${fileName}.yaml`);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch YAML for ${categoryId}: ${response.status}`
      );
    }

    const yamlText = await response.text();
    const spec = jsyaml.load(yamlText) as any;

    if (!spec || !spec.paths) {
      throw new Error(`Invalid YAML structure for category ${categoryId}`);
    }

    const endpoints: ApiEndpoint[] = [];

    for (const [path, methods] of Object.entries(spec.paths)) {
      if (typeof methods !== "object") continue;

      const methodEntries = Object.entries(methods as Record<string, any>);

      for (const [method, details] of methodEntries) {
        if (typeof details !== "object") continue;

        // Generate unique ID for endpoint
        const endpointId = `${method}-${path.replace(/[^a-zA-Z0-9]/g, "-")}`;

        // Extract examples if available
        let requestExample, responseExample;
        try {
          requestExample =
            details.requestBody?.content?.["application/json"]?.example;
          const successResponse =
            details.responses?.["200"]?.content?.["application/json"];
          responseExample =
            successResponse?.example || successResponse?.schema?.example;
        } catch (e) {
          console.warn(`Error extracting examples for ${endpointId}`, e);
        }

        endpoints.push({
          id: endpointId,
          name: details.summary || path,
          method: method.toUpperCase(),
          path,
          description: details.description || "",
          parameters: Array.isArray(details.parameters)
            ? details.parameters.map((p: any) => ({
                name: p.name,
                in: p.in,
                description: p.description || "",
                required: p.required || false,
                schema: {
                  type: p.schema?.type || "string",
                  format: p.schema?.format,
                  example: p.schema?.example,
                  enum: p.schema?.enum,
                },
              }))
            : [],
          requestExample,
          responseExample,
        });
      }
    }

    // Update cache with timestamp
    apiDataCache[cacheKey] = endpoints;
    apiDataCache[`${cacheKey}-timestamp`] = Date.now();

    return endpoints;
  } catch (error) {
    console.error(`Error loading endpoints for category ${categoryId}:`, error);
    return [];
  }
}

// Utility function to clear cache
export function clearApiDocsCache() {
  Object.keys(apiDataCache).forEach((key) => {
    delete apiDataCache[key];
  });
}
