import { Router } from 'express'
import { errorWrap } from '../utils'
import * as adminController from '../controllers/admin'

const router = Router()

router.get('/users', errorWrap(adminController.getUsers))
router.get('/blogs', errorWrap(adminController.getBlogs))

export default router
