import { Feedback, Unit } from '@prisma/client'

export type CreateFeedbackRequestDto = {
  rating: 1 | 2 | 3 | 4 | 5
  suggestion?: string
}

// Tipe data final untuk SATU feedback yang akan dikirim sebagai response
export type FeedbackResponse = {
  id: string
  rating: number
  suggestion: string | null
  ipAddress: string
  unit: {
    id: string
    code: string
    name: string
  }
  createdAt: Date
}

// Tipe data untuk response get all data dengan paginasi
export type GetAllFeedbacksResponse = {
  feedbacks: FeedbackResponse[]
  pagination: {
    totalData: number
    page: number
    limit: number
    totalPage: number
  }
}

/**
 * Helper function untuk mengubah SATU objek feedback dari Prisma
 * menjadi format JSON response yang aman (menangani BigInt dan relasi null).
 */
export function toFeedbackResponse(feedback: Feedback & { unit: Unit }): FeedbackResponse {
  return {
    id: feedback.id,
    rating: feedback.rating,
    suggestion: feedback.suggestion,
    ipAddress: feedback.ipAddress,
    unit: {
      id: feedback.unit.id,
      code: feedback.unit.code,
      name: feedback.unit.name
    },
    createdAt: feedback.createdAt
  }
}

/**
 * Helper function untuk mengubah hasil query (banyak feedback)
 * menjadi format response yang kita inginkan, lengkap dengan paginasi.
 */
export function toAllFeedbacksResponse(
  feedbacks: (Feedback & { unit: Unit })[],
  total: number,
  page: number,
  limit: number
): GetAllFeedbacksResponse {
  return {
    feedbacks: feedbacks.map(toFeedbackResponse),
    pagination: {
      totalData: total,
      page: page,
      limit: limit,
      totalPage: Math.ceil(total / limit)
    }
  }
}
