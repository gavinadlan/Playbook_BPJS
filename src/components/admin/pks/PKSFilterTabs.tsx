import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PKSFilterTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  counts: {
    all: number;
    pending: number;
    approved: number;
    rejected: number;
  };
}

export const PKSFilterTabs = ({
  activeTab,
  onTabChange,
  counts,
}: PKSFilterTabsProps) => (
  <Tabs value={activeTab} onValueChange={onTabChange}>
    <TabsList className="grid grid-cols-4">
      <TabsTrigger value="all">All ({counts.all})</TabsTrigger>
      <TabsTrigger value="pending">Pending ({counts.pending})</TabsTrigger>
      <TabsTrigger value="approved">Approved ({counts.approved})</TabsTrigger>
      <TabsTrigger value="rejected">Rejected ({counts.rejected})</TabsTrigger>
    </TabsList>
  </Tabs>
);
