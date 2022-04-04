import express from 'express'
import {getUsers, createUser, login, updateUsers, deleteUser, deleteAllUser, getProfile} from '../middleware/userMiddleware'
import { createEvent, getEvents, createComment, reply, event, deleteEvent} from '../middleware/eventMiddleware'
import { uploadMedia } from '../middleware/cloudinary'
import {requiresAuth} from '../middleware/token'
import {userJoi} from '../middleware/validation_schema'
const router = express.Router()

router.get('/', getUsers)
router.get('/events', getEvents)
router.get('/profile', requiresAuth, getProfile)
router.get("/eventProfile/:id", event)

router.post('/register', userJoi, createUser)
router.post('/login', login)
router.post('/event', requiresAuth, createEvent)
router.post('/event/:id/createComment',requiresAuth, createComment)
router.post("/event/:event_id/comment/:comment_id/replyComment", requiresAuth, reply)
router.post('/avatar', uploadMedia)

router.patch('/user/:id', requiresAuth, updateUsers)


router.delete('/user/:id', deleteUser)
router.delete('/user', deleteAllUser)
router.delete('/event/:id', requiresAuth, deleteEvent)

export {router}