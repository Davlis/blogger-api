import { Router } from 'express'
import { errorWrap } from '../utils'
import * as reportController from '../controllers/report'

const router = Router()

router.post('/', errorWrap(reportController.report))
router.get('/', errorWrap(reportController.getReports))
router.delete('/:reportId', errorWrap(reportController.deleteReport))
router.get('/:reportId', errorWrap(reportController.getReport))

export default router
