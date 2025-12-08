import express from 'express'
import '../config/passport-setup'
import authRoutes from './details/auth'
import passport from 'passport'
import { getAll as getAllUnits } from '../controller/unit-controller'
import { getAll as getAllDivisions } from '../controller/division-controller'
import { create as createFeedback } from '../controller/feedback-controller'
import { create as createFeedbackHeadOffice } from '../controller/feedback-ho-controller'

export const publicRouter = express.Router()

// Feedback user routes
// Feedback submit (single canonical path)
publicRouter.post('/api/feedback', createFeedback)
publicRouter.post('/api/feedback-ho', createFeedbackHeadOffice)
// Get All Units & Divisions (public)
publicRouter.get('/api/units/all', getAllUnits)
publicRouter.get('/api/divisions/all', getAllDivisions)

publicRouter.use('/api/auth', authRoutes)
