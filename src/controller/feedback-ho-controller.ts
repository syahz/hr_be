import requestIp from 'request-ip'
import { NextFunction, Response, RequestHandler } from 'express'
import { CreateFeedbackHeadOfficeRequestDto } from '../models/feedback-ho-model'
import { createFeedbackHeadOffice, getDashboardAdminServices, getFeedbackHeadOfficeDetails } from '../services/feedback-ho-services'

// Controller untuk mendapatkan dashboard admin (GET)
export const getDashboardAdmin: RequestHandler = async (req, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const search = (req.query.search as string) || ''

    // Parsing filter opsional
    const divisionId = (req.query.divisionId as string) || undefined

    const response = await getDashboardAdminServices(page, limit, search, divisionId)
    res.status(200).json({ data: response })
  } catch (e) {
    next(e)
  }
}

// Controller untuk mendapatkan detail feedback untuk satu feedback tertentu (GET DETAILS)
export const getDetails: RequestHandler = async (req, res: Response, next: NextFunction) => {
  try {
    const feedbackId = req.params.feedbackId
    const response = await getFeedbackHeadOfficeDetails(feedbackId)
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
    const request: CreateFeedbackHeadOfficeRequestDto = req.body as CreateFeedbackHeadOfficeRequestDto
    const divisionId = req.body.divisionId

    if (!divisionId) {
      return res.status(400).json({ error: 'Division ID is required' })
    }

    const ip = requestIp.getClientIp(req) as string

    const response = await createFeedbackHeadOffice(request, divisionId, ip)
    res.status(201).json({ data: response })
  } catch (e) {
    next(e)
  }
}
