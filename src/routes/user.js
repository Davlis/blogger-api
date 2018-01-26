import { Router } from 'express'
import { errorWrap } from '../utils'
import * as userController from '../controllers/user'

const router = Router()

router.put('/', errorWrap(userController.updateUser))
router.delete('/', errorWrap(userController.deleteUser))

export default router
