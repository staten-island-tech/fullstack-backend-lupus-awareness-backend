import express from 'express'
import  { auth } from 'express-openid-connect'
import { requiresAuth } from 'express-openid-connect'
import { createUser, getUsers, updateUsers, deleteUser, testing, checkJwt } from '../controllers/userController'
const router = express.Router()

router.get('/', requiresAuth(), getUsers)
router.post('/add', createUser)
router.post('/timesheets', testing)// Create timesheets API endpoint
router.patch('/user/:id', updateUsers)
router.delete('/user/:id', deleteUser)



export {router}