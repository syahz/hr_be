import { z } from 'zod'

export const SppQueryValidation = z.object({
  page: z.string().optional(),
  size: z.string().optional(),
  unit_id: z.string().optional(),
  month: z.string().optional(),
  year: z.string().optional()
})

// Coerce numbers to handle numeric strings from clients
const money = z.coerce.number()
const intNum = z.coerce.number().int()

export const SppCreateValidation = z.object({
  upah: money,
  bantuan_dana: money,
  lembur: money,
  tagihan_kjpri: money,
  pph_21_pekerja: money,
  pph_21_perusahaan: money,
  premi_bpjs_kesehatan: money,
  bpjs_kesehatan_perusahaan: money,
  bpjs_kesehatan_pekerja: money,
  bpjs_kesehatan_family: money,
  iuran_jkk: money,
  iuran_jkm: money,
  iuran_jht_tenaga_kerja: money,
  iuran_jp_tenaga_kerja: money,
  total_tagihan_tenaga_kerja: money,
  iuran_jht_perusahaan: money,
  iuran_jp_perusahaan: money,
  total_tagihan_perusahaan: money,
  total_tagihan_bpjs_ketenagakerjaan: money,
  piutang: money,
  hutang: money,
  unit_id: z.string(),
  month: intNum,
  year: intNum
})

export const SppUpdateValidation = SppCreateValidation.partial()
