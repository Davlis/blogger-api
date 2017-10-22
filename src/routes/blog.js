import { Router } from 'express'
import { errorWrap } from '../utils'
import * as blogController from '../controllers/blog'

const router = Router();

router.post('/', errorWrap(blogController.createBlog))
router.get('/:id', errorWrap(blogController.getBlog))
router.put('/:id', errorWrap(blogController.updateBlog))
router.delete('/:id', errorWrap(blogController.deleteBlog))

export default router