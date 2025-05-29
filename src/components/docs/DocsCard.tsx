import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface DocsCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  buttonText: string;
}

export default function DocsCard({
  icon,
  title,
  description,
  link,
  buttonText,
}: DocsCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="h-8 w-8 rounded-md bg-blue-50 p-1.5 mb-2">{icon}</div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Link href={link} passHref>
          <Button variant="ghost" className="flex justify-between w-full">
            {buttonText}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
