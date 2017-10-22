import { Router } from 'express'
import { errorWrap } from '../utils'
import * as blogController from '../controllers/blog'

const router = Router();

router.post('/', errorWrap(blogController.createBlog))

export default router