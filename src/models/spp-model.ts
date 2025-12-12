import { SuratPerintahPembayaran, Unit } from '@prisma/client'

// DTO: Create request
export interface CreateSppRequest {
  upah: number
  bantuan_dana: number
  lembur: number
  tagihan_kjpri: number
  pph_21_pekerja: number
  pph_21_perusahaan: number
  premi_bpjs_kesehatan: number
  bpjs_kesehatan_perusahaan: number
  bpjs_kesehatan_pekerja: number
  bpjs_kesehatan_family: number
  iuran_jkk: number
  iuran_jkm: number
  iuran_jht_tenaga_kerja: number
  iuran_jp_tenaga_kerja: number
  total_tagihan_tenaga_kerja: number
  iuran_jht_perusahaan: number
  iuran_jp_perusahaan: number
  total_tagihan_perusahaan: number
  total_tagihan_bpjs_ketenagakerjaan: number
  piutang: number
  hutang: number
  unit_id: string
  month: number
  year: number
}

// DTO: Update request (partial)
export type UpdateSppRequest = Partial<CreateSppRequest>

// Response type for single SPP
export type SppResponse = {
  id: string
  unit: { id: string; name: string; code: string }
  upah: number
  bantuan_dana: number
  lembur: number
  tagihan_kjpri: number
  pph_21_pekerja: number
  pph_21_perusahaan: number
  premi_bpjs_kesehatan: number
  bpjs_kesehatan_perusahaan: number
  bpjs_kesehatan_pekerja: number
  bpjs_kesehatan_family: number
  iuran_jkk: number
  iuran_jkm: number
  iuran_jht_tenaga_kerja: number
  iuran_jp_tenaga_kerja: number
  total_tagihan_tenaga_kerja: number
  iuran_jht_perusahaan: number
  iuran_jp_perusahaan: number
  total_tagihan_perusahaan: number
  total_tagihan_bpjs_ketenagakerjaan: number
  piutang: number
  hutang: number
  month: number
  year: number
}

// Pagination response
export type GetAllSppResponse = {
  spp: SppResponse[]
  pagination: {
    totalData: number
    page: number
    limit: number
    totalPage: number
  }
}

// Mapper for single record
export function toSppResponse(spp: SuratPerintahPembayaran & { unit: Unit }): SppResponse {
  return {
    id: spp.id,
    unit: { id: spp.unit.id, name: spp.unit.name, code: spp.unit.code },
    upah: spp.upah,
    bantuan_dana: spp.bantuanDana,
    lembur: spp.lembur,
    tagihan_kjpri: spp.tagihanKJPRI,
    pph_21_pekerja: spp.pphDuaSatuPekerja,
    pph_21_perusahaan: spp.pphDuaSatuPerusahaan,
    premi_bpjs_kesehatan: spp.premiBpjsKesehatan,
    bpjs_kesehatan_perusahaan: spp.bpjsKesehatanPerusahaan,
    bpjs_kesehatan_pekerja: spp.bpjsKesehatanPekerja,
    bpjs_kesehatan_family: spp.bpjsKesehatanFamily,
    iuran_jkk: spp.iuranJkk,
    iuran_jkm: spp.iuranJkm,
    iuran_jht_tenaga_kerja: spp.iuranJhtTenagaKerja,
    iuran_jp_tenaga_kerja: spp.iuranJpTenagaKerja,
    total_tagihan_tenaga_kerja: spp.totalTagihanTenagaKerja,
    iuran_jht_perusahaan: spp.iuranJhtPerusahaan,
    iuran_jp_perusahaan: spp.iuranJpPerusahaan,
    total_tagihan_perusahaan: spp.totalTagihanPerusahaan,
    total_tagihan_bpjs_ketenagakerjaan: spp.totalTagihanBpjsKetenagakerjaan,
    piutang: spp.piutang,
    hutang: spp.hutang,
    month: spp.month,
    year: spp.year
  }
}

// Mapper for list with pagination
export function toAllSppResponse(rows: (SuratPerintahPembayaran & { unit: Unit })[], total: number, page: number, limit: number): GetAllSppResponse {
  return {
    spp: rows.map(toSppResponse),
    pagination: {
      totalData: total,
      page,
      limit,
      totalPage: Math.ceil(total / limit)
    }
  }
}
