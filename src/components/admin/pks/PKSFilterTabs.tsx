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
      <TabsTrigger value="all">Semua ({counts.all})</TabsTrigger>
      <TabsTrigger value="pending">Menunggu ({counts.pending})</TabsTrigger>
      <TabsTrigger value="approved">Disetujui ({counts.approved})</TabsTrigger>
      <TabsTrigger value="rejected">Ditolak ({counts.rejected})</TabsTrigger>
    </TabsList>
  </Tabs>
);
