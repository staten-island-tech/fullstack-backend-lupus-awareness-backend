import express from 'express'
import { homePage, authMiddleware, authPage, createUser, getUsers, updateUsers, deleteUser } from '../controllers/userController'
const router = express.Router()

router.get('/', getUsers)
router.post('/add', createUser)
router.patch('/user/:id', updateUsers)
router.delete('/user/:id', deleteUser)

export {router}