import { Router } from 'express'
import * as homeController from '../controllers/home'

const router = Router();

router.get('/', homeController.welcome)

export default router