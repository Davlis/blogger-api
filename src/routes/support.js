import { Router } from 'express'
import { errorWrap } from '../utils'
import * as supportController from '../controllers/support'

const router = Router()

router.post('/', errorWrap(supportController.addSupportRequest))

export default router
