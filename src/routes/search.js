import { Router } from 'express'
import { errorWrap } from '../utils'
import * as searchController from '../controllers/search'

const router = Router()

router.get('/', errorWrap(searchController.search))
router.get('/user-blogs', errorWrap(searchController.searchUserBlogs))
router.get('/posts/tag', errorWrap(searchController.searchPostsByTags))
router.get('/blogs/tag', errorWrap(searchController.searchBlogsByTags))

export default router
