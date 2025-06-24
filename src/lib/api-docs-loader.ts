import * as jsyaml from "js-yaml";

export interface ApiCategory {
  id: string;
  name: string;
  description: string;
}

export interface ApiEndpoint {
  id: string;
  name: string;
  method: string;
  path: string;
  description: string;
  parameters: any[];
}

// Mapping nama kategori ke nama file
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

export async function loadApiCategories(): Promise<ApiCategory[]> {
  if (apiDataCache.categories) {
    return apiDataCache.categories;
  }

  try {
    const response = await fetch("/api-docs/bpjs-kesehatan.yaml");
    if (!response.ok) {
      throw new Error(`Failed to fetch YAML: ${response.status}`);
    }

    const yamlText = await response.text();
    const spec = jsyaml.load(yamlText) as any;

    const categories: ApiCategory[] = (spec.tags || []).map((tag: any) => {
      const id = tag.name.toLowerCase().replace(/\s+/g, "-");
      return {
        id,
        name: tag.name,
        description: tag.description,
      };
    });

    apiDataCache.categories = categories;
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
  if (apiDataCache[cacheKey]) {
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
      const methodEntries = Object.entries(methods as Record<string, any>);

      for (const [method, details] of methodEntries) {
        const endpointId = `${method}-${path.replace(/[^a-zA-Z0-9]/g, "-")}`;

        endpoints.push({
          id: endpointId,
          name: details.summary || path,
          method: method.toUpperCase(),
          path,
          description: details.description || "",
          parameters: details.parameters || [],
        });
      }
    }

    apiDataCache[cacheKey] = endpoints;
    return endpoints;
  } catch (error) {
    console.error(`Error loading endpoints for category ${categoryId}:`, error);
    return [];
  }
}
