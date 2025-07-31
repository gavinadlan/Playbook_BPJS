import React from "react";
import { Shield, User, Lock, Key } from "lucide-react";

interface AuthorizationInfoProps {
  serviceName: string;
}

export default function AuthorizationInfo({ serviceName }: AuthorizationInfoProps) {
  // Get service-specific information
  const getServiceInfo = () => {
    const serviceType = serviceName.toLowerCase();
    
    if (serviceType.includes("pcare")) {
      return {
        username: "usernamePcare",
        password: "passwordPcare",
        kdAplikasi: "095",
        serviceType: "PCare",
        result: "MDkwMzA0MDI6UXdlcnR5MSE6MDk1"
      };
    } else if (serviceType.includes("icare-fktp") || serviceType.includes("icare fktp")) {
      return {
        username: "usernamePcare",
        password: "passwordPcare", 
        kdAplikasi: "095",
        serviceType: "iCare FKTP",
        result: "MDkwMzA0MDI6UXdlcnR5MSE6MDk1"
      };
    }
    
    // Default fallback
    return {
      username: "usernameService",
      password: "passwordService",
      kdAplikasi: "000",
      serviceType: serviceName,
      result: "nilai_header"
    };
  };

  const serviceInfo = getServiceInfo();

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-green-600" />
        <h3 className="text-lg font-semibold text-green-800">
          Informasi Authorization untuk {serviceName}
        </h3>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-green-100 rounded-lg text-green-600 flex-shrink-0 mt-0.5">
            <User className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-medium text-green-800 mb-2">X-authorization Components</h4>
            <p className="text-sm text-green-700 mb-3">
              X-authorization merupakan kombinasi dari username dan password dari aplikasi yang akan di bridging ({serviceInfo.serviceType}), dan untuk menghasilkan enkripsi dari authorization dapat menggunakan pola Base64 Basic.
            </p>
            <div className="bg-green-100 p-4 rounded border border-green-200">
              <div className="space-y-2 text-sm text-green-800">
                <div className="flex items-center gap-2">
                  <span className="font-medium">username:</span>
                  <span className="font-mono bg-white px-2 py-1 rounded">{serviceInfo.username}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">password:</span>
                  <span className="font-mono bg-white px-2 py-1 rounded">{serviceInfo.password}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">kdAplikasi:</span>
                  <span className="font-mono bg-white px-2 py-1 rounded">{serviceInfo.kdAplikasi}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-100 rounded-lg text-blue-600 flex-shrink-0 mt-0.5">
            <Key className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-medium text-blue-800 mb-2">Authorization Formula</h4>
            <div className="bg-blue-100 p-4 rounded border border-blue-200">
              <p className="text-sm text-blue-800 font-mono">
                Authorization: Base64(username:password:kdAplikasi)
              </p>
              <p className="text-sm text-blue-800 font-mono mt-2">
                Authorization: Base64({serviceInfo.username}:{serviceInfo.password}:{serviceInfo.kdAplikasi})
              </p>
              <p className="text-sm text-blue-800 font-mono mt-2">
                Result: {serviceInfo.result}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 bg-purple-100 rounded-lg text-purple-600 flex-shrink-0 mt-0.5">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-medium text-purple-800 mb-2">Security Notes</h4>
            <div className="space-y-2 text-sm text-purple-700">
              <div className="bg-purple-100 p-3 rounded border border-purple-200">
                <p className="font-medium mb-1">⚠️ Important:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Username dan password harus valid dari aplikasi {serviceInfo.serviceType}</li>
                  <li>• kdAplikasi harus sesuai dengan kode aplikasi yang terdaftar</li>
                  <li>• Authorization header wajib untuk setiap request {serviceInfo.serviceType}</li>
                  <li>• Base64 encoding harus menggunakan UTF-8 encoding</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 