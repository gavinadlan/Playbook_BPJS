"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ApiCategoryList from "@/components/fitur-api/ApiCategoryList";
import Banner from "@/components/Banner";
import * as jsyaml from "js-yaml";

const API_ORDER = [
  { label: "Aplicares", file: "aplicares.yaml" },
  { label: "VClaim", file: "vclaim/merged.yaml" },
  { label: "AntreanRS", file: "antreanrs/merged.yaml" },
  { label: "Apotek", file: "apotek/merged.yaml" },
  { label: "PCare", file: "pcare/merged.yaml" },
  { label: "AntreanFKTP", file: "antreanfktp/merged.yaml" },
  { label: "Care", file: "icare/merged.yaml" },
  { label: "RekamMedis", file: "rekammedis/merged.yaml" },
];

export default function FiturApiPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAllYaml() {
      setLoading(true);
      setError(null);
      try {
        // Fetch all YAML files in parallel
        const results = await Promise.all(
          API_ORDER.map(async (api) => {
            try {
              const res = await fetch(`/api-docs/services/${api.file}`);
              if (!res.ok) throw new Error();
              const yamlText = await res.text();
              const spec = jsyaml.load(yamlText) as any;
              return { api, spec };
            } catch {
              return { api, spec: null };
            }
          })
        );

        // Merge all categories/tags and endpoints
        const allCategories: any[] = [];
        results.forEach(({ api, spec }) => {
          if (!spec) return;
          let tags = spec.tags;
          if (!tags) {
            // Fallback: kumpulkan tags dari paths
            const tagSet = new Set();
            Object.values(spec.paths || {}).forEach((pathObj: any) => {
              Object.values(pathObj).forEach((methodObj: any) => {
                if (Array.isArray(methodObj.tags)) {
                  methodObj.tags.forEach((tag: string) => tagSet.add(tag));
                }
              });
            });
            tags = Array.from(tagSet).map((name) => ({ name, description: "" }));
          }

          // Kelompokkan endpoint per kategori
          const categoryMap: Record<string, any> = {};
          tags.forEach((tag: any) => {
            categoryMap[tag.name] = {
              name: tag.name,
              api: api.label,
              endpoints: [],
              description: tag.description || "",
            };
          });

          Object.entries(spec.paths || {}).forEach(([path, pathObj]: [string, any]) => {
            Object.entries(pathObj).forEach(([method, methodObj]: [string, any]) => {
              if (Array.isArray(methodObj.tags)) {
                methodObj.tags.forEach((tag: string) => {
                  if (categoryMap[tag]) {
                    // If only $ref, still show endpoint with default description
                    if (methodObj.$ref && !methodObj.summary && !methodObj.description) {
                      categoryMap[tag].endpoints.push({
                        path,
                        method: method.toUpperCase(),
                        description: 'Lihat detail di file modular',
                      });
                    } else {
                      categoryMap[tag].endpoints.push({
                        path,
                        method: method.toUpperCase(),
                        description: methodObj.summary || methodObj.description || '',
                      });
                    }
                  }
                });
              }
            });
          });

          // Push categories in the order of tags
          allCategories.push(
            ...tags.map((tag: any) => categoryMap[tag.name])
          );
        });

        // Sort categories by API_ORDER
        const orderedCategories = API_ORDER.flatMap((api) =>
          allCategories.filter((cat) => cat.api === api.label)
        );
        setCategories(orderedCategories);
      } catch (e: any) {
        setError(e.message || "Gagal memuat YAML");
        setCategories([]);
      } finally {
        setLoading(false);
      }
    }
    fetchAllYaml();
  }, []);

  const toggleCategory = (categoryKey: string) => {
    setOpenCategory((prev) => (prev === categoryKey ? null : categoryKey));
  };

  return (
    <div>
      {/* Banner */}
      <Banner
        imageUrl="https://png.pngtree.com/thumb_back/fh260/back_our/20190620/ourmid/pngtree-blue-digital-technology-electronic-banner-image_168524.jpg"
        title="Dokumentasi API"
        description="Integrasikan sistem kesehatan nasional dengan API modern dan aman dari BPJS Kesehatan."
      />
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
        {loading ? (
          <div className="text-center text-gray-500">Memuat dokumentasi...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : categories.length === 0 ? (
          <div className="text-center text-gray-500">Tidak ada kategori/tag ditemukan di file YAML ini.</div>
        ) : (
          <ApiCategoryList
            categories={categories.map((cat: any) => ({
              ...cat,
              name: `[${cat.api}] ${cat.name}`,
            }))}
            openCategory={openCategory}
            toggleCategory={toggleCategory}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        )}
      </div>
    </div>
  );
}
