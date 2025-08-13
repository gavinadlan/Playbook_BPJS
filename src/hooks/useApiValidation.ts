import { useCallback } from 'react';
import { z } from 'zod';
import { ApiHeaderSchema } from '@/lib/schemas';

interface ValidationError {
  field: string;
  message: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export const useApiValidation = () => {
  // Validasi header API
  const validateHeaders = useCallback((headers: Record<string, string>): ValidationResult => {
    try {
      ApiHeaderSchema.parse(headers);
      return {
        isValid: true,
        errors: []
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors: ValidationError[] = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }));
        return {
          isValid: false,
          errors: validationErrors
        };
      }
      return {
        isValid: false,
        errors: [{ field: 'unknown', message: 'Terjadi kesalahan validasi' }]
      };
    }
  }, []);

  return {
    validateHeaders
  };
};
