import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Test API - BPJS Kesehatan',
  description: 'Test dan eksplorasi API BPJS Kesehatan secara langsung menggunakan Swagger UI',
};

export default function TestApiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
} 