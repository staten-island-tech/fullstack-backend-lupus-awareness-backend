import express from 'express'
import { homePage, authMiddleware, authPage } from '../controllers/userController'
const router = express.Router()

router.get('/', authMiddleware, homePage)
router.get('/auth', authMiddleware, authPage)

export {router}