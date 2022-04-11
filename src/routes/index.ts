import express from 'express'
const upload = require('../middleware/events/multer')

//user middleware
import {getUsers, updateUsers, deleteUser, deleteAllUser, getProfile} from '../middleware/userMiddleware'
import {login} from '../middleware/auth/login'
import {register} from '../middleware/auth/register'
import {requiresAuth} from '../middleware/auth/token'
import { uploadMedia } from '../middleware/cloudinary'

//event middleware
import { getEvents, event, deleteEvent} from '../middleware/eventMiddleware'
import {reply, createComment} from '../middleware/events/comments'
import { createEvent } from '../middleware/events/createEvent'

import {userJoi} from '../middleware/validation_schema'

const router = express.Router()

router.get('/', getUsers)
router.get('/events', getEvents)
router.get('/profile', requiresAuth, getProfile)
router.get("/eventProfile/:id", event)

router.post('/register', userJoi, register)
router.post('/login', login)
router.post('/event', requiresAuth, createEvent)
router.post('/event/:id/createComment',requiresAuth, createComment)
router.post("/event/:event_id/comment/:comment_id/replyComment", requiresAuth, reply)
router.post('/upload', upload.single('image'), uploadMedia)

router.patch('/user/:id', requiresAuth, updateUsers)


router.delete('/user/:id', deleteUser)
router.delete('/user', deleteAllUser)
router.delete('/event/:id', requiresAuth, deleteEvent)

export {router}