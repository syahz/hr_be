import { UnitVirtualAccount, Unit } from '@prisma/client'

export interface CreateUnitVirtualAccountRequest {
  unit_id: string
  va_number: string
  va_bank: string
  va_name: string
}

export type UpdateUnitVirtualAccountRequest = Partial<CreateUnitVirtualAccountRequest>

export type UnitVirtualAccountResponse = {
  id: string
  unit: { id: string; name: string; code: string }
  va_number: string
  va_bank: string
  va_name: string
}

export type GetAllUnitVirtualAccountsResponse = {
  unit_virtual_accounts: UnitVirtualAccountResponse[]
  pagination: {
    totalData: number
    page: number
    limit: number
    totalPage: number
  }
}

export function toUnitVirtualAccountResponse(row: UnitVirtualAccount & { unit: Unit }): UnitVirtualAccountResponse {
  return {
    id: row.id,
    unit: { id: row.unit.id, name: row.unit.name, code: row.unit.code },
    va_number: row.vaNumber,
    va_bank: row.vaBank,
    va_name: row.vaName
  }
}

export function toAllUnitVirtualAccountsResponse(
  rows: (UnitVirtualAccount & { unit: Unit })[],
  total: number,
  page: number,
  limit: number
): GetAllUnitVirtualAccountsResponse {
  return {
    unit_virtual_accounts: rows.map(toUnitVirtualAccountResponse),
    pagination: {
      totalData: total,
      page,
      limit,
      totalPage: Math.ceil(total / limit)
    }
  }
}
