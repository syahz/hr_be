import express from 'express'
import unitRoutes from './details/unit'
import userRoutes from './details/user'
import roleRoutes from './details/role'
import feedbackRoutes from './details/feedback'
import participantRoutes from './details/participant'
import { authRequired } from '../middleware/auth-middleware'
import divisionRoutes from './details/division'
import feedbackHoRoutes from './details/feedback-ho'

export const privateRouter = express.Router()

privateRouter.use(authRequired)

privateRouter.use('/api/admin/user', userRoutes)
privateRouter.use('/api/admin/roles', roleRoutes)
privateRouter.use('/api/admin/divisions', divisionRoutes)
privateRouter.use('/api/admin/units', unitRoutes)
privateRouter.use('/api/admin/feedbacks', feedbackRoutes)
privateRouter.use('/api/admin/feedback-ho', feedbackHoRoutes)
privateRouter.use('/api/admin/participants', participantRoutes)
