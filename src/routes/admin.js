import { Router } from 'express'
import { errorWrap } from '../utils'
import * as adminController from '../controllers/admin'

const router = Router()

router.get('/users', errorWrap(adminController.getUsers))
router.post('/users/block/:userId', errorWrap(adminController.blockUser))
router.post('/users/unblock/:userId', errorWrap(adminController.unblockUser))
router.get('/blogs', errorWrap(adminController.getBlogs))
router.delete('/blogs/:id', errorWrap(adminController.deleteBlog))
router.delete('/posts/:id', errorWrap(adminController.deletePost))

export default router
