import { Router } from 'express'
import { errorWrap } from '../utils'
import * as userController from '../controllers/user'
import uploadMiddleware from '../middleware/upload'

const router = Router()

router.put('/', errorWrap(userController.updateUser))
router.delete('/', errorWrap(userController.deleteUser))
router.put('/photo', uploadMiddleware, errorWrap(userController.addUserPhoto))

export default router
