import express from 'express'
import { createUser, getUsers, updateUsers, deleteUser, testing } from '../controllers/userController'
const router = express.Router()

router.get('/', getUsers)
router.post('/add', createUser)
router.post('/timesheets', testing)// Create timesheets API endpoint
router.patch('/user/:id', updateUsers)
router.delete('/user/:id', deleteUser)

export {router}