import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

interface UsersSearchProps {
  searchTerm: string;
  onSearch: (value: string) => void;
  onFilter: (filter: string) => void;
}

export const UsersSearch = ({
  searchTerm,
  onSearch,
  onFilter,
}: UsersSearchProps) => (
  <div className="flex gap-2">
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Cari user berdasarkan nama, email, atau role..."
        className="pl-9"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Filter berdasarkan Role</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onFilter("all")}>
          Semua Role
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onFilter("USER")}>
          User
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onFilter("ADMIN")}>
          Admin
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);
