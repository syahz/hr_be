import express from 'express'
import unitRoutes from './details/unit'
import userRoutes from './details/user'
import roleRoutes from './details/role'
import divisionRoutes from './details/division'
import participantRoutes from './details/participant'
import sppRoutes from './details/spp'
import uvaRoutes from './details/unit-virtual-account'
import { authRequired } from '../middleware/auth-middleware'

export const privateRouter = express.Router()

privateRouter.use(authRequired)

privateRouter.use('/api/admin/user', userRoutes)
privateRouter.use('/api/admin/roles', roleRoutes)
privateRouter.use('/api/admin/divisions', divisionRoutes)
privateRouter.use('/api/admin/units', unitRoutes)
privateRouter.use('/api/admin/participants', participantRoutes)
privateRouter.use('/api/admin/spp', sppRoutes)
privateRouter.use('/api/admin', uvaRoutes)
