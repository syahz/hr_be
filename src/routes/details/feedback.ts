import express from 'express'
import { get, getDetails, getDashboardAdmin, create } from '../../controller/feedback-controller'

const feedbackRoutes = express.Router()
feedbackRoutes.get('/', get)
feedbackRoutes.get('/dashboard', getDashboardAdmin)
feedbackRoutes.get('/:feedbackId', getDetails)

export default feedbackRoutes
