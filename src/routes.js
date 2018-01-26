import { Router } from 'express'

import Authenticate from './middleware/authenticate'
import authRoutes from './routes/auth'
import userRoutes from './routes/user'
import homeRoutes from './routes/home'
import blogRoutes from './routes/blog'
import postRoutes from './routes/post'
import reportRoutes from './routes/report'
import subscriptionRoutes from './routes/subscription'
import searchRoutes from './routes/search'

const router = Router()

router.use('/auth', authRoutes)
router.use('/home', Authenticate, homeRoutes)
router.use('/user', Authenticate, userRoutes)
router.use('/blogs', Authenticate, blogRoutes)
router.use('/blogs/:blogId/posts', Authenticate, postRoutes)
router.use('/report', Authenticate, reportRoutes)
router.use('/subscription', Authenticate, subscriptionRoutes)
router.use('/search', Authenticate, searchRoutes)

export default router
