import express from 'express'
import { sppController } from '../../controller/spp-controller'

const router = express.Router()

router.get('/', sppController.list)
router.post('/', sppController.create)
router.get('/:id', sppController.detail)
router.put('/:id', sppController.update)
router.delete('/:id', sppController.remove)

export default router
