import { Division, FeedbackHeadOffice } from '@prisma/client'

export type CreateFeedbackHeadOfficeRequestDto = {
  rating: 1 | 2 | 3 | 4 | 5
  suggestion?: string
}

export type FeedbackHeadOfficeResponse = {
  id: string
  rating: number
  suggestion: string | null
  ipAddress: string
  division: {
    id: string
    name: string
  }
  createdAt: Date
}

// Tipe data untuk response get all data dengan paginasi
export type GetAllFeedbacksHeadOfficeResponse = {
  feedbacks: FeedbackHeadOfficeResponse[]
  pagination: {
    totalData: number
    page: number
    limit: number
    totalPage: number
  }
}

/**
 * Helper function untuk mengubah SATU objek feedback dari Prisma
 */
export function toFeedbackHeadOfficeResponse(feedback: FeedbackHeadOffice & { division: Division }): FeedbackHeadOfficeResponse {
  return {
    id: feedback.id,
    rating: feedback.rating,
    suggestion: feedback.suggestion,
    ipAddress: feedback.ipAddress,
    division: {
      id: feedback.division.id,
      name: feedback.division.name
    },
    createdAt: feedback.createdAt
  }
}

/**
 * Helper function untuk mengubah hasil query (banyak feedback)
 */
export function toAllFeedbacksHeadOfficeResponse(
  feedbacks: (FeedbackHeadOffice & { division: Division })[],
  total: number,
  page: number,
  limit: number
): GetAllFeedbacksHeadOfficeResponse {
  return {
    feedbacks: feedbacks.map(toFeedbackHeadOfficeResponse),
    pagination: {
      totalData: total,
      page: page,
      limit: limit,
      totalPage: Math.ceil(total / limit)
    }
  }
}
