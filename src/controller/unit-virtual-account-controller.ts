import { Request, Response, NextFunction } from 'express'
import {
  getUnitVirtualAccounts,
  createUnitVirtualAccount,
  getUnitVirtualAccountById,
  updateUnitVirtualAccount,
  deleteUnitVirtualAccount
} from '../services/unit-virtual-account-services'
import { UvaCreateValidation, UvaQueryValidation, UvaUpdateValidation } from '../validation/unit-virtual-account-validation'

export const unitVirtualAccountController = {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const query = UvaQueryValidation.parse(req.query)
      const result = await getUnitVirtualAccounts(query)
      res.json(result)
    } catch (e) {
      next(e)
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = UvaCreateValidation.parse(req.body)
      const data = await createUnitVirtualAccount(payload)
      res.status(201).json({ data })
    } catch (e) {
      next(e)
    }
  },

  async detail(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await getUnitVirtualAccountById(req.params.id)
      res.json({ data })
    } catch (e) {
      next(e)
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const body = UvaUpdateValidation.parse(req.body)
      const data = await updateUnitVirtualAccount(req.params.id, body)
      res.json({ data })
    } catch (e) {
      next(e)
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await deleteUnitVirtualAccount(req.params.id)
      res.json(result)
    } catch (e) {
      next(e)
    }
  }
}
