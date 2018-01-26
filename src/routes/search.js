import { Router } from 'express'
import { errorWrap } from '../utils'
import * as searchController from '../controllers/search'

const router = Router()

router.get('/', errorWrap(searchController.search))
router.get('/posts/tag', errorWrap(searchController.searchPostsByTags))

export default router
