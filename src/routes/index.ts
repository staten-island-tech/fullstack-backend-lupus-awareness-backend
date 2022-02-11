import express from 'express'
import  { auth } from 'express-openid-connect'
import { requiresAuth } from 'express-openid-connect'
import { createUser, getUsers, updateUsers, deleteUser, getProfile} from '../controllers/userController'
const router = express.Router()


router.get('/',requiresAuth(), getUsers)
router.get('/user', createUser)
router.patch('/user/:id', updateUsers)
router.delete('/user/:id', deleteUser)
router.get('/profile', requiresAuth(), getProfile)
router.get('/dashboard', requiresAuth(), getProfile)
router.patch('/dashboard', requiresAuth(), updateUsers)





export {router}