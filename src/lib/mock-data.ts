import { ApiCategory, ApiEndpoint, ParameterType } from "@/types/api";

export const API_CATEGORIES: ApiCategory[] = [
  {
    id: "authentication",
    name: "Authentication",
    description: "Authentication and authorization endpoints",
    endpoints: [
      {
        id: "login",
        name: "Login",
        method: "POST",
        path: "/api/v1/auth/login",
        description: "Authenticate a user and receive an access token",
        parameters: [
          {
            name: "username",
            type: ParameterType.STRING,
            required: true,
            description: "The username for authentication",
          },
          {
            name: "password",
            type: ParameterType.STRING,
            required: true,
            description: "The password for authentication",
          },
        ],
        requestExample: {
          username: "example_user",
          password: "your_password",
        },
        responseExample: {
          access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          token_type: "Bearer",
          expires_in: 3600,
        },
      },
      {
        id: "logout",
        name: "Logout",
        method: "POST",
        path: "/api/v1/auth/logout",
        description: "Invalidate the current access token",
        parameters: [],
        requestExample: {},
        responseExample: {
          message: "Successfully logged out",
        },
      },
    ],
  },
  {
    id: "members",
    name: "Members",
    description: "Member management endpoints",
    endpoints: [
      {
        id: "get-member",
        name: "Get Member",
        method: "GET",
        path: "/api/v1/members/{member_id}",
        description: "Retrieve member information using their ID",
        parameters: [
          {
            name: "member_id",
            type: ParameterType.STRING,
            required: true,
            description: "The unique identifier for the member",
            in: "path",
          },
        ],
        requestExample: {},
        responseExample: {
          member_id: "123456789",
          name: "John Doe",
          birth_date: "1990-01-01",
          registration_date: "2020-05-15",
          status: "active",
          membership_type: "standard",
        },
      },
      {
        id: "update-member",
        name: "Update Member",
        method: "PUT",
        path: "/api/v1/members/{member_id}",
        description: "Update member information",
        parameters: [
          {
            name: "member_id",
            type: ParameterType.STRING,
            required: true,
            description: "The unique identifier for the member",
            in: "path",
          },
          {
            name: "name",
            type: ParameterType.STRING,
            required: false,
            description: "The member's full name",
          },
          {
            name: "birth_date",
            type: ParameterType.STRING,
            required: false,
            description: "The member's birth date (YYYY-MM-DD)",
          },
          {
            name: "membership_type",
            type: ParameterType.STRING,
            required: false,
            description: "The type of membership",
          },
        ],
        requestExample: {
          name: "John Smith",
          membership_type: "premium",
        },
        responseExample: {
          member_id: "123456789",
          name: "John Smith",
          birth_date: "1990-01-01",
          registration_date: "2020-05-15",
          status: "active",
          membership_type: "premium",
          updated_at: "2023-03-15T14:30:00Z",
        },
      },
      {
        id: "list-members",
        name: "List Members",
        method: "GET",
        path: "/api/v1/members",
        description: "Retrieve a list of members with pagination",
        parameters: [
          {
            name: "page",
            type: ParameterType.INTEGER,
            required: false,
            description: "Page number for pagination",
            defaultValue: "1",
          },
          {
            name: "limit",
            type: ParameterType.INTEGER,
            required: false,
            description: "Number of results per page",
            defaultValue: "10",
          },
          {
            name: "status",
            type: ParameterType.STRING,
            required: false,
            description: "Filter by member status (active, inactive, pending)",
          },
        ],
        requestExample: {},
        responseExample: {
          data: [
            {
              member_id: "123456789",
              name: "John Doe",
              status: "active",
              membership_type: "standard",
            },
            {
              member_id: "987654321",
              name: "Jane Smith",
              status: "active",
              membership_type: "premium",
            },
          ],
          pagination: {
            current_page: 1,
            total_pages: 5,
            total_items: 42,
            items_per_page: 10,
          },
        },
      },
    ],
  },
  {
    id: "claims",
    name: "Claims",
    description: "Healthcare claim management endpoints",
    endpoints: [
      {
        id: "submit-claim",
        name: "Submit Claim",
        method: "POST",
        path: "/api/v1/claims",
        description: "Submit a new healthcare claim",
        parameters: [
          {
            name: "member_id",
            type: ParameterType.STRING,
            required: true,
            description: "The member's ID",
          },
          {
            name: "provider_id",
            type: ParameterType.STRING,
            required: true,
            description: "The healthcare provider's ID",
          },
          {
            name: "service_date",
            type: ParameterType.STRING,
            required: true,
            description: "The date of service (YYYY-MM-DD)",
          },
          {
            name: "diagnosis_code",
            type: ParameterType.STRING,
            required: true,
            description: "The ICD-10 diagnosis code",
          },
          {
            name: "service_codes",
            type: ParameterType.ARRAY,
            required: true,
            description: "List of service codes provided",
          },
          {
            name: "total_amount",
            type: ParameterType.NUMBER,
            required: true,
            description: "Total claim amount",
          },
          {
            name: "notes",
            type: ParameterType.STRING,
            required: false,
            description: "Additional notes about the claim",
          },
        ],
        requestExample: {
          member_id: "123456789",
          provider_id: "HOSP-12345",
          service_date: "2023-05-10",
          diagnosis_code: "J06.9",
          service_codes: ["99213", "85025"],
          total_amount: 150000,
          notes: "Follow-up appointment for upper respiratory infection",
        },
        responseExample: {
          claim_id: "CLM-2023051001",
          status: "pending",
          submission_date: "2023-05-10T15:30:00Z",
          estimated_processing_time: "3-5 business days",
        },
      },
      {
        id: "get-claim-status",
        name: "Get Claim Status",
        method: "GET",
        path: "/api/v1/claims/{claim_id}",
        description: "Check the status of a submitted claim",
        parameters: [
          {
            name: "claim_id",
            type: ParameterType.STRING,
            required: true,
            description: "The claim ID to check",
            in: "path",
          },
        ],
        requestExample: {},
        responseExample: {
          claim_id: "CLM-2023051001",
          member_id: "123456789",
          provider_id: "HOSP-12345",
          submission_date: "2023-05-10T15:30:00Z",
          status: "approved",
          approved_amount: 120000,
          payment_date: "2023-05-15",
          notes: "Approved for standard coverage amount",
        },
      },
    ],
  },

  {
    id: "billing",
    name: "Billing",
    description: "Billing and payment endpoints",
    endpoints: [
      {
        id: "get-billing-details",
        name: "Get Billing Details",
        method: "GET",
        path: "/api/v1/billing/{billing_id}",
        description: "Retrieve billing details for a specific user",
        parameters: [
          {
            name: "billing_id",
            type: ParameterType.STRING,
            required: true,
            description: "The billing ID",
          },
        ],
        requestExample: {},
        responseExample: {
          billing_id: "BILL-12345",
          user_id: "USER-98765",
          amount: 500000,
          status: "paid",
          payment_method: "credit_card",
          transaction_id: "TXN-123456789",
          date: "2025-04-22",
        },
      },
      {
        id: "update-billing-status",
        name: "Update Billing Status",
        method: "PATCH",
        path: "/api/v1/billing/{billing_id}",
        description: "Update the status of a billing record",
        parameters: [
          {
            name: "billing_id",
            type: ParameterType.STRING,
            required: true,
            description: "The billing ID",
          },
          {
            name: "status",
            type: ParameterType.STRING,
            required: true,
            description:
              "The new status of the billing (e.g., 'paid', 'pending')",
          },
        ],
        requestExample: {
          status: "paid",
        },
        responseExample: {
          message: "Billing status updated successfully",
          billing_id: "BILL-12345",
          status: "paid",
        },
      },
    ],
  },
  {
    id: "facilities",
    name: "Facilities",
    description: "Facility information and availability endpoints",
    endpoints: [
      {
        id: "get-facilities",
        name: "Get Facilities",
        method: "GET",
        path: "/api/v1/facilities",
        description: "Retrieve available facilities",
        parameters: [
          {
            name: "type",
            type: ParameterType.STRING,
            required: false,
            description: "Filter by facility type",
          },
        ],
        requestExample: {},
        responseExample: {
          data: [
            {
              facility_id: "FAC-12345",
              name: "Emergency Room",
              type: "hospital",
              available: true,
            },
            {
              facility_id: "FAC-54321",
              name: "X-ray Room",
              type: "clinic",
              available: false,
            },
          ],
        },
      },
    ],
  },
  {
    id: "referrals",
    name: "Referrals",
    description: "Referral and specialist consultation endpoints",
    endpoints: [
      {
        id: "create-referral",
        name: "Create Referral",
        method: "POST",
        path: "/api/v1/referrals",
        description: "Create a new referral for a patient to a specialist",
        parameters: [
          {
            name: "patient_id",
            type: ParameterType.STRING,
            required: true,
            description: "The patient's unique ID",
          },
          {
            name: "specialist_id",
            type: ParameterType.STRING,
            required: true,
            description: "The specialist's unique ID",
          },
        ],
        requestExample: {
          patient_id: "USER-98765",
          specialist_id: "SPEC-54321",
        },
        responseExample: {
          message: "Referral created successfully",
          referral_id: "REF-12345",
        },
      },
    ],
  },
  {
    id: "appointments",
    name: "Appointments",
    description: "Appointment booking and schedule endpoints",
    endpoints: [
      {
        id: "book-appointment",
        name: "Book Appointment",
        method: "POST",
        path: "/api/v1/appointments",
        description: "Book a new appointment for a patient",
        parameters: [
          {
            name: "patient_id",
            type: ParameterType.STRING,
            required: true,
            description: "The patient's unique ID",
          },
          {
            name: "provider_id",
            type: ParameterType.STRING,
            required: true,
            description: "The healthcare provider's unique ID",
          },
          {
            name: "appointment_date",
            type: ParameterType.STRING,
            required: true,
            description: "The date of the appointment",
          },
        ],
        requestExample: {
          patient_id: "USER-98765",
          provider_id: "HOSP-12345",
          appointment_date: "2025-05-15",
        },
        responseExample: {
          message: "Appointment booked successfully",
          appointment_id: "APPT-12345",
        },
      },
    ],
  },
];

export const FAQ_DATA = [
  {
    question: "Bagaimana cara mendaftar akun?",
    answer:
      "Anda bisa mendaftar melalui halaman registrasi dengan mengisi formulir yang tersedia dan verifikasi email.",
  },
  {
    question: "Bagaimana cara reset password?",
    answer:
      "Klik 'Lupa Password' di halaman login dan ikuti instruksi yang dikirim ke email Anda.",
  },
  {
    question: "Apa syarat pengajuan klaim asuransi?",
    answer:
      "Silakan siapkan dokumen identitas, bukti transaksi, dan formulir klaim yang sudah diisi lengkap.",
  },
  {
    question: "Bagaimana cara mendapatkan token akses untuk API BPJS?",
    answer:
      "Anda perlu mengirimkan permintaan POST ke endpoint OAuth2 dengan grant_type 'client_credentials', menggunakan client_id dan client_secret yang telah diberikan.",
  },
  {
    question: "Apa itu resource 'Coverage' dalam integrasi SATUSEHAT?",
    answer:
      "Resource 'Coverage' digunakan untuk merepresentasikan data kepesertaan BPJS Kesehatan dalam format FHIR, termasuk informasi status aktif, jenis kepesertaan, dan identifikasi peserta.",
  },
  {
    question: "Bagaimana cara mengirimkan data klaim ke BPJS melalui API?",
    answer:
      "Data klaim dikirimkan dalam bentuk bundle FHIR yang mencakup resource seperti Claim, Account, ChargeItem, dan Invoice, sesuai dengan alur integrasi yang ditentukan.",
  },
  {
    question: "Apa itu proses purifikasi klaim dalam modul klaim BPJS?",
    answer:
      "Purifikasi klaim adalah proses verifikasi dan validasi klaim yang dilakukan oleh BPJS Kesehatan untuk memastikan kebenaran dan kelengkapan data sebelum klaim disetujui.",
  },
  {
    question: "Bagaimana cara mendapatkan hasil verifikasi klaim dari BPJS?",
    answer:
      "Setelah klaim diverifikasi, hasilnya dapat diakses melalui endpoint ClaimResponse dengan parameter yang sesuai, seperti nomor SEP atau ID klaim.",
  },
  {
    question: "Apa itu resource 'ClaimResponse' dalam integrasi SATUSEHAT?",
    answer:
      "Resource 'ClaimResponse' digunakan untuk merepresentasikan hasil verifikasi klaim dari BPJS Kesehatan, termasuk status klaim dan informasi pembayaran.",
  },
  {
    question: "Bagaimana cara mengirimkan data billing ke BPJS melalui API?",
    answer:
      "Data billing dikirimkan menggunakan resource 'ChargeItem' yang mencakup informasi layanan atau tindakan medis yang diberikan kepada peserta.",
  },
];

export const findEndpoint = (
  categoryId: string,
  endpointId: string
): ApiEndpoint | null => {
  const category = API_CATEGORIES.find((cat) => cat.id === categoryId);
  if (!category) return null;

  return (
    category.endpoints.find((endpoint) => endpoint.id === endpointId) || null
  );
};

export const findCategory = (categoryId: string): ApiCategory | null => {
  return API_CATEGORIES.find((cat) => cat.id === categoryId) || null;
};

export const getAllEndpoints = (): ApiEndpoint[] => {
  return API_CATEGORIES.flatMap((category) =>
    category.endpoints.map((endpoint) => ({
      ...endpoint,
      categoryId: category.id,
      categoryName: category.name,
    }))
  );
};
