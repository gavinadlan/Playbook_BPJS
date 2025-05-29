import EndpointPage from "../../../../components/docs/endpoint/EndpointPage";

interface PageProps {
  params: {
    category: string;
    endpoint: string;
  };
}

export default function Page({ params }: PageProps) {
  return (
    <main className="max-w-4xl mx-auto my-10">
      <EndpointPage category={params.category} endpoint={params.endpoint} />
    </main>
  );
}
