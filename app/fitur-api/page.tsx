"use client";

import { API_CATEGORIES } from "@/lib/mock-data";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronDown,
  Search,
  CheckCircle,
  PlusCircle,
  Edit,
  Trash,
  Lock,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleCategory = (categoryName: string) => {
    setOpenCategory((prev) => (prev === categoryName ? null : categoryName));
  };

  const filteredCategories = API_CATEGORIES.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const methodColors: { [key: string]: string } = {
    GET: "bg-green-100 text-green-800",
    POST: "bg-blue-100 text-blue-800",
    PUT: "bg-yellow-100 text-yellow-800",
    DELETE: "bg-red-100 text-red-800",
  };

  return (
    <div className="space-y-8">
      {/* Banner Section */}
      <div className="w-full relative h-96 bg-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://png.pngtree.com/thumb_back/fh260/back_our/20190620/ourmid/pngtree-blue-digital-technology-electronic-banner-image_168524.jpg"
            alt="API Documentation Banner"
            className="w-full h-full object-cover object-center opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-gray-900/40" />
        </div>

        <div className="relative max-w-7xl mx-auto h-full px-4 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Dokumentasi API
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Integrasikan sistem kesehatan nasional dengan API modern dan aman
              dari BPJS Kesehatan.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search Section */}
      <div className="w-full border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-6">
            <h2 className="text-3xl font-bold text-[#27447C]">Kategori API</h2>
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari Kategori..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 ring-[#27447C]/50 outline-none transition-all bg-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 space-y-8 pb-12">
        <div className="grid grid-cols-1 gap-4">
          {filteredCategories.map((category) => (
            <div key={category.name} className="group">
              {/* Category Header */}
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
                <ChevronDown
                  className={`h-6 w-6 transition-transform ${
                    openCategory === category.name ? "rotate-180" : ""
                  } text-gray-500`}
                />
              </motion.div>

              {/* API Cards Grid */}
              {openCategory === category.name && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.endpoints.map((endpoint) => (
                      <Card
                        key={endpoint.path}
                        className="hover:shadow-lg transition-all duration-300 bg-white border border-gray-200 group relative overflow-hidden"
                      >
                        <CardContent className="p-6 h-full flex flex-col">
                          {/* Method Badge */}
                          <div className="flex items-center justify-between mb-4">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                methodColors[endpoint.method] ||
                                "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {endpoint.method === "GET" && (
                                <CheckCircle className="w-4 h-4 mr-2" />
                              )}
                              {endpoint.method === "POST" && (
                                <PlusCircle className="w-4 h-4 mr-2" />
                              )}
                              {endpoint.method === "PUT" && (
                                <Edit className="w-4 h-4 mr-2" />
                              )}
                              {endpoint.method === "DELETE" && (
                                <Trash className="w-4 h-4 mr-2" />
                              )}
                              {endpoint.method}
                            </span>
                            <span className="text-xs text-gray-500">v1.0</span>
                          </div>

                          {/* API Path */}
                          <code className="font-mono text-sm text-[#27447C] mb-4 break-words">
                            /api/v1{endpoint.path}
                          </code>

                          {/* Description */}
                          <p className="text-gray-600 text-sm mb-4 flex-1">
                            {endpoint.description}
                          </p>

                          {/* Divider */}
                          <hr className="mb-4 border-gray-200" />

                          {/* Footer */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Lock className="w-4 h-4 text-green-600" />
                              <span className="text-xs text-gray-500">
                                Secure
                              </span>
                            </div>
                            <Button
                              variant="outline"
                              className="text-[#27447C] border-[#27447C] hover:bg-[#27447C]/10"
                              size="sm"
                            >
                              View Details
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </div>

                          {/* Hover Effect */}
                          <div className="absolute inset-0 bg-gradient-to-br from-[#27447C]/5 to-white/50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
