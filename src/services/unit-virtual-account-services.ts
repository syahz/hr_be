import { prismaClient } from '../application/database'
import { ResponseError } from '../error/response-error'
import {
  CreateUnitVirtualAccountRequest,
  UpdateUnitVirtualAccountRequest,
  toUnitVirtualAccountResponse,
  toAllUnitVirtualAccountsResponse
} from '../models/unit-virtual-account-model'

export const getUnitVirtualAccounts = async (query: any) => {
  const page = Number(query.page || 1)
  const limit = Number(query.size || 10)
  const skip = (page - 1) * limit

  const where: any = {}
  if (query.unit_id) where.unitId = query.unit_id

  const [rows, total] = await Promise.all([
    prismaClient.unitVirtualAccount.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { unit: true }
    }),
    prismaClient.unitVirtualAccount.count({ where })
  ])

  return toAllUnitVirtualAccountsResponse(rows, total, page, limit)
}

export const createUnitVirtualAccount = async (payload: CreateUnitVirtualAccountRequest) => {
  const data = await prismaClient.unitVirtualAccount.create({
    data: {
      unitId: payload.unit_id,
      vaNumber: payload.va_number,
      vaBank: payload.va_bank,
      vaName: payload.va_name
    },
    include: { unit: true }
  })
  return toUnitVirtualAccountResponse(data)
}

export const getUnitVirtualAccountById = async (id: string) => {
  const data = await prismaClient.unitVirtualAccount.findUnique({ where: { id }, include: { unit: true } })
  if (!data) throw new ResponseError(404, 'Unit Virtual Account not found')
  return toUnitVirtualAccountResponse(data)
}

export const updateUnitVirtualAccount = async (id: string, payload: UpdateUnitVirtualAccountRequest) => {
  await getUnitVirtualAccountById(id)
  const data = await prismaClient.unitVirtualAccount.update({
    where: { id },
    data: {
      unitId: payload.unit_id,
      vaNumber: payload.va_number,
      vaBank: payload.va_bank,
      vaName: payload.va_name
    },
    include: { unit: true }
  })
  return toUnitVirtualAccountResponse(data)
}

export const deleteUnitVirtualAccount = async (id: string) => {
  await getUnitVirtualAccountById(id)
  await prismaClient.unitVirtualAccount.delete({ where: { id } })
  return { ok: true }
}
