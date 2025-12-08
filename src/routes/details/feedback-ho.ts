import express from 'express'
import { getDetails, getDashboardAdmin } from '../../controller/feedback-ho-controller'

const feedbackHoRoutes = express.Router()
feedbackHoRoutes.get('/dashboard', getDashboardAdmin)
feedbackHoRoutes.get('/:feedbackId', getDetails)

export default feedbackHoRoutes
