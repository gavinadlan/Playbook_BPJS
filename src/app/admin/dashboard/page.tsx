"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";
import { UsersRound, FileCheck, BarChart } from "lucide-react";
import { fetchDashboardData } from "@/utils/api";
import { DashboardData } from "@/types/api";
import { toast } from "@/components/ui/sonner";

// Icon mapping
const iconMap = {
  "Total Users": UsersRound,
  "Pending PKS": FileCheck,
  "Approved PKS": BarChart,
};

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const data = await fetchDashboardData();
        setDashboardData(data);
      } catch (err) {
        setError("Gagal memuat data dashboard");
        toast.error("Gagal memuat data dashboard", {
          description: "Silakan coba lagi nanti",
        });
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8 p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>
            ))}
          </div>
          <div className="mt-8 space-y-4">
            <div className="h-6 bg-gray-200 rounded w-32"></div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div className="space-y-8 p-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="text-center py-8">
          <p className="text-red-500">
            {error || "Gagal memuat data dashboard"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Muat Ulang
          </button>
        </div>
      </div>
    );
  }

  const { stats, activities } = dashboardData;

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <motion.h1
        className="text-3xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Admin Dashboard
      </motion.h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const IconComponent =
            iconMap[stat.title as keyof typeof iconMap] || BarChart;

          return (
            <Link key={index} href={stat.link}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="rounded-2xl shadow-md transition hover:shadow-lg cursor-pointer">
                  <CardContent className="p-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                      <span className="text-sm text-muted-foreground">
                        {stat.description}
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold">{stat.title}</h2>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p
                      className={`text-sm ${
                        stat.change.startsWith("+")
                          ? "text-green-600"
                          : stat.change.startsWith("-")
                          ? "text-red-600"
                          : "text-gray-600"
                      }`}
                    >
                      {stat.change}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>
          );
        })}
      </div>

      {/* Activities Section */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-xl font-semibold">Recent Activities</h2>
        {activities.length > 0 ? (
          <ul className="space-y-3">
            {activities.map((activity, idx) => (
              <li
                key={idx}
                className="bg-muted/50 p-4 rounded-xl border border-muted text-sm"
              >
                <span className="font-medium">{activity.user}</span>{" "}
                {activity.action} -{" "}
                <span className="text-muted-foreground">{activity.time}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="bg-muted/50 p-4 rounded-xl border border-muted text-sm text-center text-muted-foreground">
            Belum ada aktivitas terbaru
          </div>
        )}
      </motion.div>
    </div>
  );
}
