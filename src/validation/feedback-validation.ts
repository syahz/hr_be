import { z } from 'zod'

export class FeedbackValidation {
  /**
   * Skema untuk validasi data saat membuat feedback baru.
   * Cocok dengan DTO `CreateFeedbackRequestDto`.
   */
  static readonly CREATE = z.object({
    rating: z.number().min(1, 'Rating minimal 1').max(5, 'Rating maksimal 5'),
    suggestion: z.string().max(500, 'Suggestion maksimal 500 karakter').optional(),
    unitId: z.uuid('unitId harus berupa UUID')
  })
}
