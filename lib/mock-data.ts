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
          password: "your_password"
        },
        responseExample: {
          access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          token_type: "Bearer",
          expires_in: 3600
        }
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
          message: "Successfully logged out"
        }
      }
    ]
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
            in: "path"
          }
        ],
        requestExample: {},
        responseExample: {
          member_id: "123456789",
          name: "John Doe",
          birth_date: "1990-01-01",
          registration_date: "2020-05-15",
          status: "active",
          membership_type: "standard"
        }
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
            in: "path"
          },
          {
            name: "name",
            type: ParameterType.STRING,
            required: false,
            description: "The member's full name"
          },
          {
            name: "birth_date",
            type: ParameterType.STRING,
            required: false,
            description: "The member's birth date (YYYY-MM-DD)"
          },
          {
            name: "membership_type",
            type: ParameterType.STRING,
            required: false,
            description: "The type of membership"
          }
        ],
        requestExample: {
          name: "John Smith",
          membership_type: "premium"
        },
        responseExample: {
          member_id: "123456789",
          name: "John Smith",
          birth_date: "1990-01-01",
          registration_date: "2020-05-15",
          status: "active",
          membership_type: "premium",
          updated_at: "2023-03-15T14:30:00Z"
        }
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
            defaultValue: "1"
          },
          {
            name: "limit",
            type: ParameterType.INTEGER,
            required: false,
            description: "Number of results per page",
            defaultValue: "10"
          },
          {
            name: "status",
            type: ParameterType.STRING,
            required: false,
            description: "Filter by member status (active, inactive, pending)"
          }
        ],
        requestExample: {},
        responseExample: {
          data: [
            {
              member_id: "123456789",
              name: "John Doe",
              status: "active",
              membership_type: "standard"
            },
            {
              member_id: "987654321",
              name: "Jane Smith",
              status: "active",
              membership_type: "premium"
            }
          ],
          pagination: {
            current_page: 1,
            total_pages: 5,
            total_items: 42,
            items_per_page: 10
          }
        }
      }
    ]
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
            description: "The member's ID"
          },
          {
            name: "provider_id",
            type: ParameterType.STRING,
            required: true,
            description: "The healthcare provider's ID"
          },
          {
            name: "service_date",
            type: ParameterType.STRING,
            required: true,
            description: "The date of service (YYYY-MM-DD)"
          },
          {
            name: "diagnosis_code",
            type: ParameterType.STRING,
            required: true,
            description: "The ICD-10 diagnosis code"
          },
          {
            name: "service_codes",
            type: ParameterType.ARRAY,
            required: true,
            description: "List of service codes provided"
          },
          {
            name: "total_amount",
            type: ParameterType.NUMBER,
            required: true,
            description: "Total claim amount"
          },
          {
            name: "notes",
            type: ParameterType.STRING,
            required: false,
            description: "Additional notes about the claim"
          }
        ],
        requestExample: {
          member_id: "123456789",
          provider_id: "HOSP-12345",
          service_date: "2023-05-10",
          diagnosis_code: "J06.9",
          service_codes: ["99213", "85025"],
          total_amount: 150000,
          notes: "Follow-up appointment for upper respiratory infection"
        },
        responseExample: {
          claim_id: "CLM-2023051001",
          status: "pending",
          submission_date: "2023-05-10T15:30:00Z",
          estimated_processing_time: "3-5 business days"
        }
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
            in: "path"
          }
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
          notes: "Approved for standard coverage amount"
        }
      }
    ]
  },
  {
    id: "providers",
    name: "Providers",
    description: "Healthcare provider management endpoints",
    endpoints: [
      {
        id: "list-providers",
        name: "List Providers",
        method: "GET",
        path: "/api/v1/providers",
        description: "Retrieve a list of healthcare providers",
        parameters: [
          {
            name: "location",
            type: ParameterType.STRING,
            required: false,
            description: "Filter by provider location (city or region)"
          },
          {
            name: "specialty",
            type: ParameterType.STRING,
            required: false,
            description: "Filter by medical specialty"
          },
          {
            name: "page",
            type: ParameterType.INTEGER,
            required: false,
            description: "Page number for pagination",
            defaultValue: "1"
          },
          {
            name: "limit",
            type: ParameterType.INTEGER,
            required: false,
            description: "Number of results per page",
            defaultValue: "20"
          }
        ],
        requestExample: {},
        responseExample: {
          data: [
            {
              provider_id: "HOSP-12345",
              name: "RS Umum Pusat Jakarta",
              type: "hospital",
              location: "Jakarta",
              address: "Jl. Diponegoro No. 71, Jakarta Pusat",
              specialties: ["general", "cardiology", "orthopedics"],
              contact_number: "021-7654321"
            },
            {
              provider_id: "CLIN-54321",
              name: "Klinik Sehat Sentosa",
              type: "clinic",
              location: "Bandung",
              address: "Jl. Pasteur No. 11, Bandung",
              specialties: ["general", "pediatrics"],
              contact_number: "022-1234567"
            }
          ],
          pagination: {
            current_page: 1,
            total_pages: 8,
            total_items: 156,
            items_per_page: 20
          }
        }
      },
      {
        id: "get-provider",
        name: "Get Provider",
        method: "GET",
        path: "/api/v1/providers/{provider_id}",
        description: "Retrieve detailed information about a healthcare provider",
        parameters: [
          {
            name: "provider_id",
            type: ParameterType.STRING,
            required: true,
            description: "The provider's unique ID",
            in: "path"
          }
        ],
        requestExample: {},
        responseExample: {
          provider_id: "HOSP-12345",
          name: "RS Umum Pusat Jakarta",
          type: "hospital",
          location: "Jakarta",
          address: "Jl. Diponegoro No. 71, Jakarta Pusat",
          coordinates: {
            latitude: -6.1754,
            longitude: 106.8272
          },
          specialties: ["general", "cardiology", "orthopedics", "neurology", "oncology"],
          facilities: ["emergency", "inpatient", "outpatient", "laboratory", "radiology"],
          contact_number: "021-7654321",
          email: "info@rsujakarta.co.id",
          website: "https://www.rsujakarta.co.id",
          operating_hours: {
            monday_to_friday: "07:00 - 22:00",
            saturday: "07:00 - 18:00",
            sunday: "08:00 - 16:00"
          },
          partnership_level: "premium",
          registration_date: "2015-03-10"
        }
      }
    ]
  }
];

export const findEndpoint = (categoryId: string, endpointId: string): ApiEndpoint | null => {
  const category = API_CATEGORIES.find(cat => cat.id === categoryId);
  if (!category) return null;
  
  return category.endpoints.find(endpoint => endpoint.id === endpointId) || null;
};

export const findCategory = (categoryId: string): ApiCategory | null => {
  return API_CATEGORIES.find(cat => cat.id === categoryId) || null;
};

export const getAllEndpoints = (): ApiEndpoint[] => {
  return API_CATEGORIES.flatMap(category => 
    category.endpoints.map(endpoint => ({
      ...endpoint,
      categoryId: category.id,
      categoryName: category.name
    }))
  );
};