"use client";

import { Card, CardContent } from "@/components/ui/card";
import { adminData } from "@/lib/adminData";
import { motion } from "framer-motion";
import Link from "next/link";

export default function DashboardPage() {
  const { stats, activities } = adminData.dashboard;

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
        {stats.map((stat, index) => (
          <Link key={index} href={stat.link}>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Card className="rounded-2xl shadow-md transition hover:shadow-lg cursor-pointer">
                <CardContent className="p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <stat.icon className="h-6 w-6 text-blue-600" />
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
                        : "text-red-600"
                    }`}
                  >
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Activities Section */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-xl font-semibold">Recent Activities</h2>
        <ul className="space-y-3">
          {activities.map((act, idx) => (
            <li
              key={idx}
              className="bg-muted/50 p-4 rounded-xl border border-muted text-sm"
            >
              <span className="font-medium">{act.user}</span> {act.action} -{" "}
              <span className="text-muted-foreground">{act.time}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
