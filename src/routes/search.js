import { Router } from 'express'
import { errorWrap } from '../utils'
import * as searchController from '../controllers/search'

const router = Router()

router.get('/:query', errorWrap(searchController.search))

export default router
