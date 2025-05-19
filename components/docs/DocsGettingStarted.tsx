import DocsCard from "./DocsCard";
import { Terminal, Database } from "lucide-react";

export default function DocsGettingStarted() {
  return (
    <section className="mt-12 grid gap-6 md:grid-cols-2">
      <DocsCard
        icon={<Terminal className="text-blue-600" />}
        title="Getting Started"
        description="Learn how to set up and authenticate with our API."
        link="/docs/authentication"
        buttonText="Read Guide"
      />
      <DocsCard
        icon={<Database className="text-blue-600" />}
        title="API Keys"
        description="Generate and manage your API keys to start making requests."
        link="/docs/api-keys"
        buttonText="Manage Keys"
      />
    </section>
  );
}
