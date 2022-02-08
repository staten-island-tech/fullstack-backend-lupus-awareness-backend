import express from 'express'
import  { auth } from 'express-openid-connect'
import { requiresAuth } from 'express-openid-connect'
import { createUser, getUsers, updateUsers, deleteUser} from '../controllers/userController'
const router = express.Router()


router.get('/',requiresAuth(), getUsers)
router.get('/user', createUser)
router.patch('/user/:id', updateUsers)
router.delete('/user/:id', deleteUser)





export {router}