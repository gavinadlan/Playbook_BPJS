"use client";

interface EndpointPageProps {
  category: string;
  endpoint: string;
}

export default function EndpointPage({
  category,
  endpoint,
}: EndpointPageProps) {
  return (
    <section className="p-6 bg-white rounded shadow-md">
      <h1 className="text-3xl font-bold mb-4">Category: {category}</h1>
      <h2 className="text-xl mb-2">Endpoint: {endpoint}</h2>
      <p>
        Ini adalah halaman dokumentasi untuk endpoint <code>{endpoint}</code> di
        kategori <code>{category}</code>.
      </p>
    </section>
  );
}
