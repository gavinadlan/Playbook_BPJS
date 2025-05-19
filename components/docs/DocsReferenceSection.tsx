import DocsCard from "./DocsCard";
import { Users, FileText, FileSearch } from "lucide-react";

export default function DocsReferenceSection() {
  return (
    <section className="mt-16">
      <h2 className="text-xl font-semibold mb-4">API Reference</h2>
      <div className="grid gap-6 md:grid-cols-3">
        <DocsCard
          icon={<Users className="text-blue-600" />}
          title="Members"
          description="View, update, and manage member data."
          link="/docs/members"
          buttonText="View Endpoints"
        />
        <DocsCard
          icon={<FileText className="text-blue-600" />}
          title="Claims"
          description="Submit and track claim requests."
          link="/docs/claims"
          buttonText="Explore"
        />
        <DocsCard
          icon={<FileSearch className="text-blue-600" />}
          title="Providers"
          description="Search and manage healthcare providers."
          link="/docs/providers"
          buttonText="Browse"
        />
      </div>
    </section>
  );
}
