import { z } from 'zod'

export const UvaQueryValidation = z.object({
  page: z.string().optional(),
  size: z.string().optional(),
  unit_id: z.string().optional()
})

export const UvaCreateValidation = z.object({
  unit_id: z.string(),
  va_number: z.string(),
  va_bank: z.string(),
  va_name: z.string()
})

export const UvaUpdateValidation = UvaCreateValidation.partial()
