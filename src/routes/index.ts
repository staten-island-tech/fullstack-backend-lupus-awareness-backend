import express from 'express'
import { createUser, getUsers, updateUsers, deleteUser, testing, checkJwt } from '../controllers/userController'
const router = express.Router()

router.get('/', getUsers)
router.post('/add', createUser)
router.post('/timesheets',checkJwt, testing)// Create timesheets API endpoint
router.patch('/user/:id', updateUsers)
router.delete('/user/:id', deleteUser)

export {router}