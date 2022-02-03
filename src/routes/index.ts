import express from 'express'
import  { auth } from 'express-openid-connect'
import { requiresAuth } from 'express-openid-connect'
import { createUser, getUsers, updateUsers, deleteUser, test } from '../controllers/userController'
const router = express.Router()

router.get('/', getUsers)
router.get('/user', createUser)
router.post('/login', createUser)
router.patch('/user/:id', updateUsers)
router.delete('/user/:id', deleteUser)
router.get("/get", test)//test



export {router}