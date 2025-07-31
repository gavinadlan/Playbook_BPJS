import React from "react";
import { Info, Clock, Shield, User, Key } from "lucide-react";
import { bpjsDocs } from "@/lib/bpjs-docs";

interface HeaderDetailsProps {
  serviceName: string;
  explanations?: { [key: string]: string };
}

export default function HeaderDetails({ serviceName, explanations }: HeaderDetailsProps) {
  // Get service from bpjs-docs.ts
  const service = bpjsDocs.find(doc => 
    doc.title.toLowerCase() === serviceName.toLowerCase() ||
    doc.id.toLowerCase() === serviceName.toLowerCase()
  );

  // Extract explanations from service description if not provided
  const getExplanationsFromDescription = () => {
    if (!service?.description) return {};

    const lines = service.description.split('\n');
    const explanations: { [key: string]: string } = {};
    
    let currentHeader = '';
    let currentExplanation = '';
    
    lines.forEach(line => {
      if (line.includes('1. X-cons-id') || line.includes('X-cons-id,')) {
        if (currentHeader && currentExplanation) {
          explanations[currentHeader] = currentExplanation.trim();
        }
        currentHeader = 'X-cons-id';
        currentExplanation = 'Merupakan kode consumer (pengakses web-service). Kode ini akan diberikan oleh BPJS Kesehatan.';
      } else if (line.includes('2. X-timestamp') || line.includes('X-timestamp,')) {
        if (currentHeader && currentExplanation) {
          explanations[currentHeader] = currentExplanation.trim();
        }
        currentHeader = 'X-timestamp';
        currentExplanation = 'Merupakan waktu yang akan di-generate oleh client saat ingin memanggil setiap service. Format waktu ini ditulis dengan format unix-based-time (berisi angka, tidak dalam format tanggal sebagaimana mestinya). Format waktu menggunakan Coordinated Universal Time (UTC), dalam penggunaannya untuk mendapatkan timestamp, rumus yang digunakan adalah (local time in UTC timezone in seconds) - (1970-01-01 in seconds).';
      } else if (line.includes('3. X-signature') || line.includes('X-signature,')) {
        if (currentHeader && currentExplanation) {
          explanations[currentHeader] = currentExplanation.trim();
        }
        currentHeader = 'X-signature';
        currentExplanation = 'Merupakan hasil dari pembuatan signature yang dibuat oleh client. Signature yang digunakan menggunakan pola HMAC-SHA256.';
      } else if (line.includes('4. X-authorization') || line.includes('X-authorization,')) {
        if (currentHeader && currentExplanation) {
          explanations[currentHeader] = currentExplanation.trim();
        }
        currentHeader = 'X-authorization';
        currentExplanation = `Merupakan kombinasi dari username dan password dari aplikasi yang akan di bridging (${serviceName}), dan untuk menghasilkan enkripsi dari authorization dapat menggunakan pola Base64 Basic.

username : usernamePcare
password : passwordPcare
kdAplikasi : 095
Authorization : Base64(username:password:kdAplikasi)`;
      } else if (line.includes('5. user_key') || line.includes('user_key,')) {
        if (currentHeader && currentExplanation) {
          explanations[currentHeader] = currentExplanation.trim();
        }
        currentHeader = 'user_key';
        currentExplanation = 'Merupakan key untuk mengakses webservice. Setiap service consumer memiliki user_key masing-masing.';
      } else if (currentHeader === 'X-authorization' && (line.includes('username :') || line.includes('password :') || line.includes('kdAplikasi :') || line.includes('Authorization :'))) {
        currentExplanation += '\n' + line.trim();
      }
    });
    
    // Add the last header explanation
    if (currentHeader && currentExplanation) {
      explanations[currentHeader] = currentExplanation.trim();
    }
    
    return explanations;
  };

  // Default explanations if not provided
  const defaultExplanations: { [key: string]: string } = {
    "X-cons-id": "Merupakan kode consumer (pengakses web-service). Kode ini akan diberikan oleh BPJS Kesehatan.",
    "X-timestamp": "Merupakan waktu yang akan di-generate oleh client saat ingin memanggil setiap service. Format waktu ini ditulis dengan format unix-based-time (berisi angka, tidak dalam format tanggal sebagaimana mestinya). Format waktu menggunakan Coordinated Universal Time (UTC), dalam penggunaannya untuk mendapatkan timestamp, rumus yang digunakan adalah: (local time in UTC timezone in seconds) - (1970-01-01 in seconds)",
    "X-signature": "Merupakan hasil dari pembuatan signature yang dibuat oleh client. Signature yang digunakan menggunakan pola HMAC-SHA256.",
    "X-authorization": `Merupakan kombinasi dari username dan password dari aplikasi yang akan di bridging (${serviceName}), dan untuk menghasilkan enkripsi dari authorization dapat menggunakan pola Base64 Basic.

username : usernamePcare
password : passwordPcare
kdAplikasi : 095
Authorization : Base64(username:password:kdAplikasi)`,
    "user_key": "Merupakan key untuk mengakses webservice. Setiap service consumer memiliki user_key masing-masing."
  };

  const headerExplanations: { [key: string]: string } = explanations || getExplanationsFromDescription() || defaultExplanations;

  // Create dynamic header config based on available headers
  const createHeaderConfig = () => {
    const configs = [];
    let index = 1;
    
    if (headerExplanations["X-cons-id"]) {
      configs.push({ key: "X-cons-id", icon: User, color: "yellow", title: `${index}. X-cons-id` });
      index++;
    }
    if (headerExplanations["X-timestamp"]) {
      configs.push({ key: "X-timestamp", icon: Clock, color: "blue", title: `${index}. X-timestamp` });
      index++;
    }
    if (headerExplanations["X-signature"]) {
      configs.push({ key: "X-signature", icon: Shield, color: "green", title: `${index}. X-signature` });
      index++;
    }
    if (headerExplanations["X-authorization"]) {
      configs.push({ key: "X-authorization", icon: Key, color: "purple", title: `${index}. X-authorization` });
      index++;
    }
    if (headerExplanations["user_key"]) {
      configs.push({ key: "user_key", icon: Key, color: "orange", title: `${index}. user_key` });
    }
    
    return configs;
  };

  const headerConfig = createHeaderConfig();

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Info className="w-5 h-5 text-yellow-600" />
        <h3 className="text-lg font-semibold text-yellow-800">
          Penjelasan Detail Header untuk {serviceName}
        </h3>
      </div>
      
      <div className="space-y-4">
        {headerConfig.map((config) => {
          const IconComponent = config.icon;
          const explanation = headerExplanations[config.key];
          
          if (!explanation) return null;

          const colorClasses = {
            yellow: "bg-yellow-100 text-yellow-600",
            blue: "bg-blue-100 text-blue-600", 
            green: "bg-green-100 text-green-600",
            purple: "bg-purple-100 text-purple-600",
            orange: "bg-orange-100 text-orange-600"
          };

          const textClasses = {
            yellow: "text-yellow-800",
            blue: "text-blue-800",
            green: "text-green-800", 
            purple: "text-purple-800",
            orange: "text-orange-800"
          };

          return (
            <div key={config.key} className="flex items-start gap-3">
              <div className={`p-2 rounded-lg flex-shrink-0 mt-0.5 ${colorClasses[config.color as keyof typeof colorClasses]}`}>
                <IconComponent className="w-4 h-4" />
              </div>
              <div>
                <h4 className={`font-medium mb-2 ${textClasses[config.color as keyof typeof textClasses]}`}>
                  {config.title}
                </h4>
                <p className={`text-sm ${textClasses[config.color as keyof typeof textClasses]}`}>
                  {explanation.split('\n\n')[0]}
                </p>
                {config.key === "X-timestamp" && (
                  <div className="bg-blue-100 p-3 rounded border border-blue-200 mt-2">
                    <p className="text-xs text-blue-800 font-mono">
                      (local time in UTC timezone in seconds) - (1970-01-01 in seconds)
                    </p>
                  </div>
                )}
                {config.key === "X-authorization" && explanation.includes('username :') && (
                  <div className="bg-purple-100 p-3 rounded border border-purple-200 mt-2">
                    <div className="space-y-1">
                      {explanation.split('\n\n')[1]?.split('\n').map((line, index) => (
                        <p key={index} className="text-xs text-purple-800 font-mono">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 