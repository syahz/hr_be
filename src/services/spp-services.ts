import { ResponseError } from '../error/response-error'
import { sppModel } from '../models/spp-model'

export const getSpp = async (query: any) => {
  const page = Number(query.page || 1)
  const size = Number(query.size || 10)
  const where: any = {}
  if (query.unitId) where.unitId = query.unitId
  if (query.month) where.month = Number(query.month)
  if (query.year) where.year = Number(query.year)
  return sppModel.findMany(page, size, where)
}

export const createSpp = async (payload: any) => {
  return sppModel.create(payload)
}

export const getSppById = async (id: string) => {
  const data = await sppModel.findById(id)
  if (!data) throw new ResponseError(404, 'SPP not found')
  return data
}

export const updateSpp = async (id: string, payload: any) => {
  await getSppById(id)
  return sppModel.update(id, payload)
}

export const deleteSpp = async (id: string) => {
  await getSppById(id)
  await sppModel.delete(id)
  return { ok: true }
}
