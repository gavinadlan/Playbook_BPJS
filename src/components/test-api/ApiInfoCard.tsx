import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface ApiInfoCardProps {
  title: string;
  description: string;
  baseUrl: string;
  version: string;
  status: 'active' | 'inactive';
  endpoints: number;
  onCopyUrl?: () => void;
}

export default function ApiInfoCard({
  title,
  description,
  baseUrl,
  version,
  status,
  endpoints,
  onCopyUrl
}: ApiInfoCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(baseUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onCopyUrl?.();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
          <Badge variant={status === 'active' ? 'default' : 'secondary'}>
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-600">Version:</span>
            <p className="text-gray-900">{version}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Endpoints:</span>
            <p className="text-gray-900">{endpoints}</p>
          </div>
        </div>
        
        <div>
          <span className="font-medium text-gray-600 text-sm">Base URL:</span>
          <div className="flex items-center gap-2 mt-1">
            <code className="flex-1 bg-gray-100 px-3 py-2 rounded text-sm font-mono">
              {baseUrl}
            </code>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyUrl}
              className="flex-shrink-0"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => window.open(baseUrl, '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Visit API
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 