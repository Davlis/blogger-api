import { Router } from 'express'
import { errorWrap } from '../utils'
import * as authController from '../controllers/auth'

const router = Router()

router.post('/login', errorWrap(authController.login))
router.post('/register', errorWrap(authController.register))
router.post('/resetPassword', errorWrap(authController.resetPassword))

export default router
