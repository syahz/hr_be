import { Validation } from '../validation/Validation'
import { prismaClient } from '../application/database'
import { ResponseError } from '../error/response-error'
import { UserWithRelations } from '../type/user-request'
import { FeedbackValidation } from '../validation/feedback-validation'
import { toFeedbackResponse, toAllFeedbacksResponse, CreateFeedbackRequestDto } from '../models/feedback-model'

/**
 * Mengambil semua data feedback dengan paginasi dan pencarian.
 */
export const getFeedbacks = async (user: UserWithRelations, page: number, limit: number, search: string) => {
  const skip = (page - 1) * limit

  const baseWhere: any = {
    unitId: user.unitId
  }

  let searchFilter = {}
  if (search) {
    const isNumeric = !isNaN(parseFloat(search)) && isFinite(Number(search))
    searchFilter = {
      OR: [
        { suggestion: { contains: search } },
        { unit: { name: { contains: search } } },
        { unit: { code: { contains: search } } },
        ...(isNumeric ? [{ rating: { equals: parseInt(search) } }] : [])
      ]
    }
  }

  const where = {
    ...baseWhere,
    ...(search && { AND: [searchFilter] })
  }

  const [totalFeedbacks, feedbacks] = await prismaClient.$transaction([
    prismaClient.feedback.count({ where }),
    prismaClient.feedback.findMany({
      where,
      include: {
        unit: true
      },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' }
    })
  ])

  // Summary counts (scoped by unitId if provided)
  const totalInUnit = await prismaClient.feedback.count({ where: { unitId: user.unitId } })

  // Rating distribution
  const [rating1, rating2, rating3, rating4, rating5] = await prismaClient.$transaction([
    prismaClient.feedback.count({ where: { ...baseWhere, rating: 1 } }),
    prismaClient.feedback.count({ where: { ...baseWhere, rating: 2 } }),
    prismaClient.feedback.count({ where: { ...baseWhere, rating: 3 } }),
    prismaClient.feedback.count({ where: { ...baseWhere, rating: 4 } }),
    prismaClient.feedback.count({ where: { ...baseWhere, rating: 5 } })
  ])

  const list = toAllFeedbacksResponse(feedbacks, totalFeedbacks, page, limit)
  return {
    feedbacks: list.feedbacks,
    pagination: list.pagination,
    summary: {
      totalFeedbacks: totalInUnit,
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
 * Mengambil data dashboard untuk admin.
 */
export const getDashboardAdminServices = async (page: number, limit: number, search: string, unitId?: string) => {
  const skip = (page - 1) * limit

  const baseWhere: any = {
    ...(unitId ? { unitId } : {})
  }

  let searchFilter = {}
  if (search) {
    const isNumeric = !isNaN(parseFloat(search)) && isFinite(Number(search))
    searchFilter = {
      OR: [
        { suggestion: { contains: search } },
        { unit: { name: { contains: search } } },
        { unit: { code: { contains: search } } },
        ...(isNumeric ? [{ rating: { equals: parseInt(search) } }] : [])
      ]
    }
  }

  const where = {
    ...baseWhere,
    ...(search && { AND: [searchFilter] })
  }

  const [totalFeedbacks, feedbacks] = await prismaClient.$transaction([
    prismaClient.feedback.count({ where }),
    prismaClient.feedback.findMany({
      where,
      include: {
        unit: true
      },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' }
    })
  ])

  // Summary counts (scoped by unitId if provided)
  const totalInUnit = unitId ? await prismaClient.feedback.count({ where: { unitId } }) : await prismaClient.feedback.count()

  // Rating distribution
  const [rating1, rating2, rating3, rating4, rating5] = await prismaClient.$transaction([
    prismaClient.feedback.count({ where: { ...baseWhere, rating: 1 } }),
    prismaClient.feedback.count({ where: { ...baseWhere, rating: 2 } }),
    prismaClient.feedback.count({ where: { ...baseWhere, rating: 3 } }),
    prismaClient.feedback.count({ where: { ...baseWhere, rating: 4 } }),
    prismaClient.feedback.count({ where: { ...baseWhere, rating: 5 } })
  ])

  const list = toAllFeedbacksResponse(feedbacks, totalFeedbacks, page, limit)
  return {
    feedbacks: list.feedbacks,
    pagination: list.pagination,
    summary: {
      totalFeedbacks: totalInUnit,
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
export const createFeedback = async (request: CreateFeedbackRequestDto, unitId: string, ip: string) => {
  const createRequest = Validation.validate(FeedbackValidation.CREATE, request)

  // Validasi unit exists
  const unit = await prismaClient.unit.findUnique({
    where: { id: unitId }
  })
  if (!unit) {
    throw new ResponseError(404, 'Unit tidak ditemukan')
  }

  const feedback = await prismaClient.feedback.create({
    data: {
      rating: createRequest.rating,
      suggestion: createRequest.suggestion,
      unitId: unitId,
      ipAddress: ip
    },
    include: {
      unit: true
    }
  })

  return toFeedbackResponse(feedback)
}

/**
 * Mendapatkan detail feedback berdasarkan ID.
 */
export const getFeedbackDetails = async (feedbackId: string) => {
  const feedback = await prismaClient.feedback.findUnique({
    where: { id: feedbackId },
    include: {
      unit: true
    }
  })

  if (!feedback) {
    throw new ResponseError(404, 'Feedback tidak ditemukan')
  }

  return toFeedbackResponse(feedback)
}
