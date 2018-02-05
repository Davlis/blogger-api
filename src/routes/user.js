import { Router } from 'express'
import { errorWrap } from '../utils'
import * as userController from '../controllers/user'
import uploadMiddleware from '../middleware/upload'

const router = Router()

router.put('/', errorWrap(userController.updateUser))
router.delete('/', errorWrap(userController.deleteUser))
router.get('/:userId', errorWrap(userController.getUser))
router.put('/photo', uploadMiddleware, errorWrap(userController.addUserPhoto))
router.put('/upload', uploadMiddleware, errorWrap(userController.uploadFile))
router.get('/upload', errorWrap(userController.getUserFiles))

export default router
