import { prismaClient } from '../application/database'
import { ResponseError } from '../error/response-error'
import { CreateSppRequest, UpdateSppRequest, toAllSppResponse, toSppResponse } from '../models/spp-model'

export const getSpp = async (query: any) => {
  const page = Number(query.page || 1)
  const limit = Number(query.size || 10)
  const skip = (page - 1) * limit

  const where: any = {}
  if (query.unit_id) where.unitId = query.unit_id
  if (query.month) where.month = Number(query.month)
  if (query.year) where.year = Number(query.year)

  const [rows, total] = await Promise.all([
    prismaClient.suratPerintahPembayaran.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { unit: true }
    }),
    prismaClient.suratPerintahPembayaran.count({ where })
  ])

  return toAllSppResponse(rows, total, page, limit)
}

export const createSpp = async (payload: CreateSppRequest) => {
  const data = await prismaClient.suratPerintahPembayaran.create({
    data: {
      upah: payload.upah,
      bantuanDana: payload.bantuan_dana,
      lembur: payload.lembur,
      tagihanKJPRI: payload.tagihan_kjpri,
      pphDuaSatuPekerja: payload.pph_21_pekerja,
      pphDuaSatuPerusahaan: payload.pph_21_perusahaan,
      premiBpjsKesehatan: payload.premi_bpjs_kesehatan,
      bpjsKesehatanPerusahaan: payload.bpjs_kesehatan_perusahaan,
      bpjsKesehatanPekerja: payload.bpjs_kesehatan_pekerja,
      bpjsKesehatanFamily: payload.bpjs_kesehatan_family,
      iuranJkk: payload.iuran_jkk,
      iuranJkm: payload.iuran_jkm,
      iuranJhtTenagaKerja: payload.iuran_jht_tenaga_kerja,
      iuranJpTenagaKerja: payload.iuran_jp_tenaga_kerja,
      totalTagihanTenagaKerja: payload.total_tagihan_tenaga_kerja,
      iuranJhtPerusahaan: payload.iuran_jht_perusahaan,
      iuranJpPerusahaan: payload.iuran_jp_perusahaan,
      totalTagihanPerusahaan: payload.total_tagihan_perusahaan,
      totalTagihanBpjsKetenagakerjaan: payload.total_tagihan_bpjs_ketenagakerjaan,
      piutang: payload.piutang,
      hutang: payload.hutang,
      unitId: payload.unit_id,
      month: payload.month,
      year: payload.year
    },
    include: { unit: true }
  })
  return toSppResponse(data)
}

export const getSppById = async (id: string) => {
  const data = await prismaClient.suratPerintahPembayaran.findUnique({ where: { id }, include: { unit: true } })
  if (!data) throw new ResponseError(404, 'SPP not found')
  return toSppResponse(data)
}

export const updateSpp = async (id: string, payload: UpdateSppRequest) => {
  await getSppById(id)
  const data = await prismaClient.suratPerintahPembayaran.update({
    where: { id },
    data: {
      upah: payload.upah,
      bantuanDana: payload.bantuan_dana,
      lembur: payload.lembur,
      tagihanKJPRI: payload.tagihan_kjpri,
      pphDuaSatuPekerja: payload.pph_21_pekerja,
      pphDuaSatuPerusahaan: payload.pph_21_perusahaan,
      premiBpjsKesehatan: payload.premi_bpjs_kesehatan,
      bpjsKesehatanPerusahaan: payload.bpjs_kesehatan_perusahaan,
      bpjsKesehatanPekerja: payload.bpjs_kesehatan_pekerja,
      bpjsKesehatanFamily: payload.bpjs_kesehatan_family,
      iuranJkk: payload.iuran_jkk,
      iuranJkm: payload.iuran_jkm,
      iuranJhtTenagaKerja: payload.iuran_jht_tenaga_kerja,
      iuranJpTenagaKerja: payload.iuran_jp_tenaga_kerja,
      totalTagihanTenagaKerja: payload.total_tagihan_tenaga_kerja,
      iuranJhtPerusahaan: payload.iuran_jht_perusahaan,
      iuranJpPerusahaan: payload.iuran_jp_perusahaan,
      totalTagihanPerusahaan: payload.total_tagihan_perusahaan,
      totalTagihanBpjsKetenagakerjaan: payload.total_tagihan_bpjs_ketenagakerjaan,
      piutang: payload.piutang,
      hutang: payload.hutang,
      unitId: payload.unit_id,
      month: payload.month,
      year: payload.year
    },
    include: { unit: true }
  })
  return toSppResponse(data)
}

export const deleteSpp = async (id: string) => {
  await getSppById(id)
  await prismaClient.suratPerintahPembayaran.delete({ where: { id } })
  return { ok: true }
}
