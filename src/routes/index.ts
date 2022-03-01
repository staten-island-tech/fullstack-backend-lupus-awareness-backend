import express from 'express'
import cors from 'cors'
import  { auth } from 'express-openid-connect'
import { requiresAuth } from 'express-openid-connect'
import { createEvent } from '../controllers/eventController'
import { createUser, getUsers, updateUsers, deleteUser, getProfile} from '../controllers/userController'
const router = express.Router()


router.get('/', requiresAuth(),  getUsers)
router.patch('/user/:id', requiresAuth(), updateUsers)
router.delete('/user/:id', deleteUser)
router.get('/profile', requiresAuth(), getProfile)
router.get('/dashboard', requiresAuth(), getProfile)
router.patch('/dashboard', requiresAuth(), updateUsers)
router.post('/event', requiresAuth(), createEvent)





export {router}