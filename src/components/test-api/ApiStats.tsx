import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  Zap, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle 
} from 'lucide-react';

interface ApiStatsProps {
  totalServices: number;
  activeServices: number;
  totalEndpoints: number;
  averageResponseTime?: number;
  uptime?: number;
}

export default function ApiStats({
  totalServices,
  activeServices,
  totalEndpoints,
  averageResponseTime = 250,
  uptime = 99.9
}: ApiStatsProps) {
  const inactiveServices = totalServices - activeServices;

  const stats = [
    {
      title: 'Total Services',
      value: totalServices,
      icon: Activity,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Active Services',
      value: activeServices,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Total Endpoints',
      value: totalEndpoints,
      icon: Zap,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Avg Response Time',
      value: `${averageResponseTime}ms`,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Uptime',
      value: `${uptime}%`,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">API Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {stats.map((stat, idx) => (
            <div key={stat.title} className={`flex flex-col items-center p-4 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`w-6 h-6 mb-2 ${stat.color}`} />
              <div className="text-xl font-bold">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.title}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 