import { Router } from 'express'
import { errorWrap } from '../utils'
import * as reportController from '../controllers/report'

const router = Router()

router.post('/', errorWrap(reportController.report))

export default router
