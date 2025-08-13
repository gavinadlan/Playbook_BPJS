import { z } from "zod";

// Skema Login
export const LoginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  // Tambahkan role opsional untuk frontend
  role: z.enum(["USER", "ADMIN"]).optional(),
});

// Skema Registrasi
export const RegisterSchema = z
  .object({
    name: z.string().min(3, "Nama minimal 3 karakter"),
    email: z.string().email("Email tidak valid"),
    password: z.string().min(6, "Password minimal 6 karakter"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });

// Skema Lupa Password
export const ForgotPasswordSchema = z.object({
  email: z.string().email("Email tidak valid"),
});

// Skema Reset Password
export const ResetPasswordSchema = z
  .object({
    newPassword: z.string().min(6, "Password minimal 6 karakter"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });

// Skema untuk update user
export const UpdateUserSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter").optional(),
  email: z.string().email("Email tidak valid").optional(),
  role: z.enum(["USER", "ADMIN"]).optional(),
  isVerified: z.boolean().optional(),
  password: z
    .string()
    .min(6, "Password minimal 6 karakter")
    .optional()
    .or(z.literal("")),
});

// Skema untuk pengajuan PKS
export const PengajuanPKSSchema = z.object({
  company: z.string().min(3, "Nama perusahaan minimal 3 karakter"),
  file: z
    .instanceof(File, { message: "Dokumen harus diunggah" })
    .refine((file) => file.size <= 5 * 1024 * 1024, "Ukuran file maksimal 5MB")
    .refine(
      (file) =>
        [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(file.type),
      "Format file harus PDF, DOC, atau DOCX"
    ),
});

// ===== SCHEMA SIMPLE UNTUK API TESTING =====

// Schema untuk header API BPJS Kesehatan
export const ApiHeaderSchema = z.object({
  'x-cons-id': z.string().min(1, "Consumer ID wajib diisi"),
  'x-timestamp': z.string().min(1, "Timestamp wajib diisi"),
  'x-signature': z.string().min(1, "Signature wajib diisi"),
  'user_key': z.string().min(1, "User key wajib diisi"),
  'Content-Type': z.string().default("application/json"),
  'Authorization': z.string().optional(),
});
