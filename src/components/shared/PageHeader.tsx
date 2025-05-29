import { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PageHeaderProps {
  title: string;
  description: string;
  action?: {
    text: string;
    href: string;
    icon: ReactNode;
  };
}

export const PageHeader = ({ title, description, action }: PageHeaderProps) => (
  <div className="flex justify-between items-center mb-6">
    <div>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </div>
    {action && (
      <Button asChild>
        <Link href={action.href}>
          {action.icon}
          <span className="ml-2">{action.text}</span>
        </Link>
      </Button>
    )}
  </div>
);
