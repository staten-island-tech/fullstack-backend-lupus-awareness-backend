import express from 'express'
import {getUsers, createUser, login, updateUsers, deleteUser, deleteAllUser, getProfile} from '../middleware/userMiddleware'
import { createEvent, getEvents, createComment, reply } from '../middleware/eventMiddleware'
import {requiresAuth} from '../middleware/token'
import {userJoi} from '../middleware/validation_schema'
const router = express.Router()

router.get('/', getUsers)
router.post('/register', userJoi, createUser)
router.post('/login', login)
router.patch('/user/:id', updateUsers)
router.delete('/user/:id', deleteUser)
router.post('/event', requiresAuth, createEvent)
router.get('/events', getEvents)
router.delete('/user', deleteAllUser)
router.get('/profile', requiresAuth, getProfile)
router.post('/event/:id/createComment',requiresAuth, createComment)
router.post("/event/:event_id/comment/:id/replyComment", requiresAuth, reply)

export {router}