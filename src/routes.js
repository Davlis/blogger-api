import { Router } from 'express'
import performHealthCheck from './healthcheck'
import { performMetricLoadTest, performMetricFailureTest } from './metrics'

import Authenticate from './middleware/authenticate'
import isAdmin from './middleware/isAdmin'

import authRoutes from './routes/auth'
import userRoutes from './routes/user'
import homeRoutes from './routes/home'
import blogRoutes from './routes/blog'
import postRoutes from './routes/post'
import reportRoutes from './routes/report'
import subscriptionRoutes from './routes/subscription'
import searchRoutes from './routes/search'
import adminRoutes from './routes/admin'
import supportRoutes from './routes/support'

const router = Router()

router.use('/healthcheck', performHealthCheck)

router.use('/api/auth', authRoutes)
router.use('/api/home', Authenticate, homeRoutes)
router.use('/api/user', Authenticate, userRoutes)
router.use('/api/blogs', Authenticate, blogRoutes)
router.use('/api/blogs/:blogId/posts', Authenticate, postRoutes)
router.use('/api/report', Authenticate, reportRoutes)
router.use('/api/subscription', Authenticate, subscriptionRoutes)
router.use('/api/search', Authenticate, searchRoutes)
router.use('/api/admin', Authenticate, isAdmin, adminRoutes)
router.use('/api/support', Authenticate, supportRoutes)

router.get('/api/metrics/load', performMetricLoadTest)
router.post('/api/metrics/fail', performMetricFailureTest)

export default router
