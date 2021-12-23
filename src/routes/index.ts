import express from 'express'
import { homePage, authMiddleware, authPage, createUser, getUsers } from '../controllers/userController'
const router = express.Router()

router.get('/', getUsers)
router.post('/add', createUser)

export {router}