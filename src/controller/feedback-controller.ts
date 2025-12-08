import requestIp from 'request-ip'
import { NextFunction, Response, RequestHandler } from 'express'
import { CreateFeedbackRequestDto } from '../models/feedback-model'
import { UserRequest, UserWithRelations } from '../type/user-request'
import { getDashboardAdminServices, getFeedbacks, createFeedback, getFeedbackDetails } from '../services/feedback-services'

// Controller untuk mendapatkan dashboard admin (GET)
export const getDashboardAdmin: RequestHandler = async (req, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const search = (req.query.search as string) || ''

    // Parsing filter opsional
    const unitId = (req.query.unitId as string) || undefined

    const response = await getDashboardAdminServices(page, limit, search, unitId)
    res.status(200).json({ data: response })
  } catch (e) {
    next(e)
  }
}

// Controller untuk mendapatkan daftar feedback (GET)
export const get: RequestHandler = async (req, res: Response, next: NextFunction) => {
  try {
    const user = (req as UserRequest).user! as UserWithRelations

    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const search = (req.query.search as string) || ''

    const response = await getFeedbacks(user, page, limit, search)
    res.status(200).json({ data: response })
  } catch (e) {
    next(e)
  }
}

// Controller untuk mendapatkan detail feedback untuk satu feedback tertentu (GET DETAILS)
export const getDetails: RequestHandler = async (req, res: Response, next: NextFunction) => {
  try {
    const feedbackId = req.params.feedbackId
    const response = await getFeedbackDetails(feedbackId)
    res.status(200).json({
      data: response
    })
  } catch (e) {
    next(e)
  }
}

// Controller untuk membuat feedback (POST)
export const create: RequestHandler = async (req, res: Response, next: NextFunction) => {
  try {
    const request: CreateFeedbackRequestDto = req.body as CreateFeedbackRequestDto
    const unitId = req.body.unitId

    if (!unitId) {
      return res.status(400).json({ error: 'Unit ID is required' })
    }

    const ip = requestIp.getClientIp(req) as string

    const response = await createFeedback(request, unitId, ip)
    res.status(201).json({ data: response })
  } catch (e) {
    next(e)
  }
}
