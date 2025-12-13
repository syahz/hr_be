import { Request, Response, NextFunction } from 'express'
import { getSpp, createSpp, getSppById, updateSpp, deleteSpp } from '../services/spp-services'
import { SppCreateValidation, SppQueryValidation, SppUpdateValidation } from '../validation/spp-validation'

export const sppController = {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const query = SppQueryValidation.parse(req.query)
      const result = await getSpp(query)
      // Services already return mapped pagination + data in snake_case
      res.json(result)
    } catch (e) {
      next(e)
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = SppCreateValidation.parse(req.body)
      const data = await createSpp(payload)
      res.status(201).json({ data })
    } catch (e) {
      next(e)
    }
  },

  async detail(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await getSppById(req.params.id)
      res.json({ data })
    } catch (e) {
      next(e)
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const body = SppUpdateValidation.parse(req.body)
      const data = await updateSpp(req.params.id, body)
      res.json({ data })
    } catch (e) {
      next(e)
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await deleteSpp(req.params.id)
      res.json(result)
    } catch (e) {
      next(e)
    }
  }
}
