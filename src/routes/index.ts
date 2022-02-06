import express from 'express'
import  { auth } from 'express-openid-connect'
import { requiresAuth } from 'express-openid-connect'
import { createUser, getUsers, updateUsers, deleteUser, test } from '../controllers/userController'
import { createEvent } from '../controllers/eventController'
const router = express.Router()


router.get('/',requiresAuth(), getUsers)
router.get('/user', createUser)
router.post('/login', test)
router.patch('/user/:id', updateUsers)
router.delete('/user/:id', deleteUser)
router.get("/get", test)//test
router.post('/event', requiresAuth(), createEvent)

export {router}