"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BarChart, UsersRound, FileCheck, ArrowUpRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdminLoggedIn") === "true";
    if (!isAdmin) router.push("/admin");

    // Animate progress bars
    const timer = setTimeout(() => setProgress(67), 500);
    return () => clearTimeout(timer);
  }, [router]);

  // Dashboard statistics
  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      change: "+12%",
      description: "Compared to last month",
      icon: UsersRound,
      link: "/admin/users",
    },
    {
      title: "Pending PKS",
      value: "42",
      change: "-8%",
      description: "Compared to last month",
      icon: FileCheck,
      link: "/admin/pks",
    },
    {
      title: "Approved PKS",
      value: "187",
      change: "+24%",
      description: "Compared to last month",
      icon: BarChart,
      link: "/admin/pks",
    },
  ];

  // Activity data
  const activities = [
    { user: "John Doe", action: "approved PKS document", time: "2 hours ago" },
    {
      user: "Sarah Johnson",
      action: "rejected PKS application",
      time: "5 hours ago",
    },
    { user: "Admin", action: "added new user", time: "Yesterday" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-gray-500">
          Welcome to your admin dashboard. Here's a summary of your system.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {stat.title}
              </CardTitle>
              <div className="p-2 bg-gray-100 rounded-full">
                <stat.icon className="h-4 w-4 text-gray-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs flex items-center text-gray-500">
                <span
                  className={
                    stat.change.includes("+")
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {stat.change}
                </span>
                <span className="ml-1">{stat.description}</span>
              </p>
            </CardContent>
            <CardFooter className="pt-0">
              <Link
                href={stat.link}
                className="text-xs text-blue-600 hover:underline flex items-center"
              >
                View Details <ArrowUpRight className="h-3 w-3 ml-1" />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Additional dashboard content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Feed */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>The latest actions in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-medium">
                    {activity.user.charAt(0)}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>{" "}
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Link href="#" className="text-xs text-blue-600 hover:underline">
              View all activity
            </Link>
          </CardFooter>
        </Card>

        {/* Progress Card */}
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Performance & resources</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Storage Usage</span>
                <span className="text-sm font-medium">67%</span>
              </div>
              <Progress value={67} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">
                  PKS Process Completion
                </span>
                <span className="text-sm font-medium">82%</span>
              </div>
              <Progress value={82} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">System Performance</span>
                <span className="text-sm font-medium">94%</span>
              </div>
              <Progress value={94} className="h-2" />
            </div>
          </CardContent>
          <CardFooter>
            <Link href="#" className="text-xs text-blue-600 hover:underline">
              View system details
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
