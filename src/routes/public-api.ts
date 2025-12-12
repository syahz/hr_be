import express from 'express'
import authRoutes from './details/auth'
import { getAll as getAllUnits } from '../controller/unit-controller'
import { getAll as getAllDivisions } from '../controller/division-controller'

export const publicRouter = express.Router()

// Get All Units & Divisions (public)
publicRouter.get('/api/units/all', getAllUnits)
publicRouter.get('/api/divisions/all', getAllDivisions)

publicRouter.use('/api/auth', authRoutes)
