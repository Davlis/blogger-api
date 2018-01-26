import { Router } from 'express'
import { errorWrap } from '../utils'
import * as blogController from '../controllers/blog'

const router = Router();

router.post('/', errorWrap(blogController.createBlog))
router.get('/', errorWrap(blogController.getUserBlogs))
router.get('/:blogId', errorWrap(blogController.getBlog))
router.put('/:blogId', errorWrap(blogController.updateBlog))
router.delete('/:blogId', errorWrap(blogController.deleteBlog))
router.post('/:blogId/access', errorWrap(blogController.grantAccess))
router.delete('/:blogId/access', errorWrap(blogController.revokeAccess))

export default router
