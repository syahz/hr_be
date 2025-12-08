import { Validation } from '../validation/Validation'
import { prismaClient } from '../application/database'
import { ResponseError } from '../error/response-error'
import { FeedbackHoValidation } from '../validation/feedback-ho-validation'
import { toFeedbackHeadOfficeResponse, toAllFeedbacksHeadOfficeResponse, CreateFeedbackHeadOfficeRequestDto } from '../models/feedback-ho-model'

/**
 * Mengambil data dashboard untuk admin.
 */
export const getDashboardAdminServices = async (page: number, limit: number, search: string, divisionId?: string) => {
  const skip = (page - 1) * limit

  const baseWhere: any = {
    ...(divisionId ? { divisionId } : {})
  }

  let searchFilter = {}
  if (search) {
    const isNumeric = !isNaN(parseFloat(search)) && isFinite(Number(search))
    searchFilter = {
      OR: [
        { suggestion: { contains: search } },
        { division: { name: { contains: search } } },
        { division: { code: { contains: search } } },
        ...(isNumeric ? [{ rating: { equals: parseInt(search) } }] : [])
      ]
    }
  }

  const where = {
    ...baseWhere,
    ...(search && { AND: [searchFilter] })
  }

  const [totalFeedbacks, feedbacks] = await prismaClient.$transaction([
    prismaClient.feedbackHeadOffice.count({ where }),
    prismaClient.feedbackHeadOffice.findMany({
      where,
      include: {
        division: true
      },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' }
    })
  ])

  // Summary counts (scoped by divisionId if provided)
  const totallDivision = divisionId
    ? await prismaClient.feedbackHeadOffice.count({ where: { divisionId } })
    : await prismaClient.feedbackHeadOffice.count()

  // Rating distribution
  const [rating1, rating2, rating3, rating4, rating5] = await prismaClient.$transaction([
    prismaClient.feedbackHeadOffice.count({ where: { ...baseWhere, rating: 1 } }),
    prismaClient.feedbackHeadOffice.count({ where: { ...baseWhere, rating: 2 } }),
    prismaClient.feedbackHeadOffice.count({ where: { ...baseWhere, rating: 3 } }),
    prismaClient.feedbackHeadOffice.count({ where: { ...baseWhere, rating: 4 } }),
    prismaClient.feedbackHeadOffice.count({ where: { ...baseWhere, rating: 5 } })
  ])

  const list = toAllFeedbacksHeadOfficeResponse(feedbacks, totalFeedbacks, page, limit)
  return {
    feedbacks: list.feedbacks,
    pagination: list.pagination,
    summary: {
      totalFeedbacks: totallDivision,
      ratingDistribution: {
        rating1,
        rating2,
        rating3,
        rating4,
        rating5
      }
    }
  }
}

/**
 * Membuat feedback baru.
 */
export const createFeedbackHeadOffice = async (request: CreateFeedbackHeadOfficeRequestDto, divisionId: string, ip: string) => {
  const createRequest = Validation.validate(FeedbackHoValidation.CREATE, request)

  // Validasi unit exists
  const division = await prismaClient.division.findUnique({
    where: { id: divisionId }
  })
  if (!division) {
    throw new ResponseError(404, 'Divisi tidak ditemukan')
  }

  const feedback = await prismaClient.feedbackHeadOffice.create({
    data: {
      rating: createRequest.rating,
      suggestion: createRequest.suggestion,
      divisionId: divisionId,
      ipAddress: ip
    },
    include: {
      division: true
    }
  })

  return toFeedbackHeadOfficeResponse(feedback)
}

/**
 * Mendapatkan detail feedback berdasarkan ID.
 */
export const getFeedbackHeadOfficeDetails = async (feedbackId: string) => {
  const feedback = await prismaClient.feedbackHeadOffice.findUnique({
    where: { id: feedbackId },
    include: {
      division: true
    }
  })

  if (!feedback) {
    throw new ResponseError(404, 'Feedback tidak ditemukan')
  }

  return toFeedbackHeadOfficeResponse(feedback)
}
