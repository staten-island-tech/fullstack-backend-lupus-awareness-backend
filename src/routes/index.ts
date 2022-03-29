import express from 'express'
import {getUsers, createUser, login, updateUsers, deleteUser, deleteAllUser, getProfile} from '../middleware/userMiddleware'
import { createEvent, getEvents, createComment, reply, event, deleteEvent} from '../middleware/eventMiddleware'
import {requiresAuth} from '../middleware/token'
import {userJoi} from '../middleware/validation_schema'
const router = express.Router()

router.get('/', getUsers)
router.get('/events', getEvents)

router.post('/register', userJoi, createUser)
router.post('/login', login)
router.post('/event', requiresAuth, createEvent)

router.patch('/user/:id', requiresAuth, updateUsers)


router.delete('/user/:id', deleteUser)
router.delete('/user', deleteAllUser)



router.get('/profile', requiresAuth, getProfile)
router.post('/event/:id/createComment',requiresAuth, createComment)
router.post("/event/:event_id/comment/:comment_id/replyComment", requiresAuth, reply)
router.get("/eventProfile/:id", event)
router.delete('/event/:id', requiresAuth, deleteEvent)

export {router}