import { Router } from 'express'
import { errorWrap } from '../utils'
import * as postController from '../controllers/post'

const router = Router({ mergeParams: true })

router.post('/', errorWrap(postController.createPost))
router.get('/', errorWrap(postController.getBlogPosts))
router.get('/:postId', errorWrap(postController.getPost))
router.put('/:postId', errorWrap(postController.updatePost))
router.delete('/:postId', errorWrap(postController.deletePost))

export default router
