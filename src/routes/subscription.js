import { Router } from 'express'
import { errorWrap } from '../utils'
import * as subscriptionController from '../controllers/subscription'

const router = Router()

router.post('/', errorWrap(subscriptionController.subscribeTo))
router.get('/', errorWrap(subscriptionController.getSubscriptions))
router.delete('/:reportId', errorWrap(subscriptionController.deleteSubscription))

export default router
