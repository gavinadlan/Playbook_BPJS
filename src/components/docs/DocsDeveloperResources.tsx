import DocsCard from "./DocsCard";
import { BookText, BugPlay, Github } from "lucide-react";

export default function DocsDeveloperResources() {
  return (
    <section className="mt-16">
      <h2 className="text-xl font-semibold mb-4">Developer Resources</h2>
      <div className="grid gap-6 md:grid-cols-3">
        <DocsCard
          icon={<BookText className="text-blue-600" />}
          title="API Docs"
          description="Interactive Swagger documentation for testing endpoints."
          link="/swagger"
          buttonText="Open Swagger"
        />
        <DocsCard
          icon={<BugPlay className="text-blue-600" />}
          title="Postman Collection"
          description="Run our endpoints in Postman environment."
          link="https://www.postman.com/your-workspace"
          buttonText="Open Postman"
        />
        <DocsCard
          icon={<Github className="text-blue-600" />}
          title="GitHub Repo"
          description="Explore the open-source code and contribute."
          link="https://github.com/your-org/your-api"
          buttonText="View on GitHub"
        />
      </div>
    </section>
  );
}
