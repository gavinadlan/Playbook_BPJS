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
