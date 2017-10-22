import { Router } from 'express'
import { errorWrap } from '../utils'
import * as postController from '../controllers/post'

const router = Router();

router.post('/', errorWrap(postController.createPost))
router.get('/:id', errorWrap(postController.getPost))
router.put('/:id', errorWrap(postController.updatePost))
router.delete('/:id', errorWrap(postController.deletePost))

export default router