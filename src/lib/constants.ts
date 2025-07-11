// API Configuration
export const API_CONFIG = {
  SEARCH_RESULT_LIMIT: 20,
  SCROLL_DELAY: 1000,
  DEFAULT_SERVICE: 'bpjs kesehatan api',
  DEFAULT_SWAGGER_URL: '/api-docs/bpjs-kesehatan.yaml',
} as const;

// API Services Configuration
export const API_SERVICES = [
  {
    name: 'BPJS Kesehatan API',
    file: '/api-docs/bpjs-kesehatan.yaml',
    description: 'Dokumentasi lengkap semua layanan BPJS Kesehatan',
    status: 'active' as const
  },
  {
    name: 'Aplicares',
    file: '/api-docs/services/aplicares.yaml',
    description: 'Layanan Aplicares untuk manajemen aplikasi',
    status: 'active' as const
  },
  {
    name: 'VClaim',
    file: '/api-docs/services/vclaim/merged.yaml',
    description: 'Layanan VClaim untuk klaim asuransi',
    status: 'active' as const
  },
  {
    name: 'AntreanRS',
    file: '/api-docs/services/antreanrs/merged.yaml',
    description: 'Layanan Antrean Rumah Sakit',
    status: 'active' as const
  },
  {
    name: 'Apotek',
    file: '/api-docs/services/apotek/merged.yaml',
    description: 'Layanan Apotek',
    status: 'active' as const
  },
  {
    name: 'PCare',
    file: '/api-docs/services/pcare/merged.yaml',
    description: 'Layanan PCare',
    status: 'active' as const
  },
  {
    name: 'AntreanFKTP',
    file: '/api-docs/services/antreanfktp/merged.yaml',
    description: 'Layanan Antrean FKTP',
    status: 'active' as const
  },
  {
    name: 'i-Care',
    file: '/api-docs/services/icare/merged.yaml',
    description: 'Layanan i-Care JKN',
    status: 'active' as const
  },
  {
    name: 'RekamMedis',
    file: '/api-docs/services/rekammedis/merged.yaml',
    description: 'Layanan eRekam Medis',
    status: 'active' as const
  }
] as const; 