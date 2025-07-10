"use client";

import { motion } from "framer-motion";
import SearchInput from "./SearchInput";
import ApiCategoryCard from "./ApiCategoryCard";

interface Endpoint {
  path: string;
  method: string;
  description: string;
  api: string; // add api property
}

interface Category {
  name: string;
  endpoints: Endpoint[];
  api: string; // add api property
}

interface ApiCategoryListProps {
  categories: Category[];
  openCategory: string | null;
  toggleCategory: (categoryName: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function ApiCategoryList({
  categories,
  openCategory,
  toggleCategory,
  searchTerm,
  setSearchTerm,
}: ApiCategoryListProps) {
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="w-full border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-6">
            <h2 className="text-3xl font-bold text-[#27447C]">Kategori</h2>
            <SearchInput value={searchTerm} onChange={setSearchTerm} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 space-y-8 pb-12">
        {filteredCategories.map((category) => (
          <div key={category.name} className="group">
            <motion.div
              onClick={() => toggleCategory(category.name)}
              className="cursor-pointer flex justify-between items-center p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              whileHover={{ scale: 1.005 }}
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {category.endpoints.length} endpoints tersedia
                </p>
              </div>
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className={`h-6 w-6 transition-transform ${
                  openCategory === category.name ? "rotate-180" : ""
                } text-gray-500`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </motion.svg>
            </motion.div>

            {openCategory === category.name && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.endpoints.map((endpoint) => (
                    <ApiCategoryCard key={endpoint.path + endpoint.method} endpoint={{ ...endpoint, api: category.api }} />
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
