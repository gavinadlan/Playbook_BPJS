import React from "react";
import { Info, Key, Clock, Shield } from "lucide-react";

interface SignatureInfoProps {
  serviceName: string;
}

export default function SignatureInfo({ serviceName }: SignatureInfoProps) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-blue-800">
          Informasi Signature untuk {serviceName}
        </h3>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-100 rounded-lg text-blue-600 flex-shrink-0 mt-0.5">
            <Key className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-medium text-blue-800 mb-1">Consumer Credentials</h4>
            <p className="text-sm text-blue-700">
              Untuk mengakses web-service dari BPJS Kesehatan, service consumer akan mendapatkan:
            </p>
            <ul className="mt-2 space-y-1 text-sm text-blue-700">
              <li>• <strong>Consumer ID</strong> - Kode consumer dari BPJS Kesehatan</li>
              <li>• <strong>Consumer Secret</strong> - Secret key untuk generate signature</li>
            </ul>
            <div className="mt-2 p-3 bg-blue-100 rounded border border-blue-200">
              <p className="text-xs text-blue-800 font-mono">
                <strong>Catatan:</strong> Consumer Secret hanya disimpan oleh service consumer dan tidak dikirim ke server untuk menjaga keamanan.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 bg-green-100 rounded-lg text-green-600 flex-shrink-0 mt-0.5">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-medium text-green-800 mb-1">Timestamp Generation</h4>
            <p className="text-sm text-green-700 mb-2">
              X-timestamp menggunakan format unix-based-time dengan UTC timezone:
            </p>
            <div className="bg-green-100 p-3 rounded border border-green-200">
              <p className="text-xs text-green-800 font-mono">
                (local time in UTC timezone in seconds) - (1970-01-01 in seconds)
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 bg-purple-100 rounded-lg text-purple-600 flex-shrink-0 mt-0.5">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-medium text-purple-800 mb-1">Signature Process</h4>
            <div className="space-y-2 text-sm text-purple-700">
              <div className="bg-purple-100 p-3 rounded border border-purple-200">
                <p className="font-medium mb-1">Contoh:</p>
                <p className="font-mono text-xs">
                  consumerID: 1234<br/>
                  consumerSecret: pwd<br/>
                  timestamp: 433223232<br/>
                  variabel1: consumerID&timestamp<br/>
                  variabel1: 1234&433223232
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded border border-purple-200">
                <p className="font-medium mb-1">Metode HMAC-SHA256:</p>
                <p className="font-mono text-xs">
                  message: aaa<br/>
                  key: bbb<br/>
                  hasil: 20BKS3PWnD3XU4JbSSZvVlGi2WWnDa8Sv9uHJ+wsELA=
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded border border-purple-200">
                <p className="font-medium mb-1">Signature Formula:</p>
                <p className="font-mono text-xs">
                  Signature: HMAC-256(variabel1 : consumerSecret)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 