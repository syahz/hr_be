import express from 'express'
import { unitVirtualAccountController } from '../../controller/unit-virtual-account-controller'

const router = express.Router()

router.get('/unit-virtual-accounts', unitVirtualAccountController.list)
router.post('/unit-virtual-accounts', unitVirtualAccountController.create)
router.get('/unit-virtual-accounts/:id', unitVirtualAccountController.detail)
router.put('/unit-virtual-accounts/:id', unitVirtualAccountController.update)
router.delete('/unit-virtual-accounts/:id', unitVirtualAccountController.remove)

export default router
