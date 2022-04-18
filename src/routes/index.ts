import express from 'express'
const upload = require('../middleware/events/multer')

//user middleware
import {getUsers, updateUsers, deleteUser, deleteAllUser, getProfile} from '../middleware/userMiddleware'
import {login} from '../middleware/user/login'
import {register} from '../middleware/user/register'
// import { requiresAuth } from '../middleware/user/token'
const requiresAuth = require('../middleware/user/token')
import { uploadMedia } from '../middleware/cloudinary'

//event middleware
import { event, deleteEvent} from '../middleware/eventMiddleware'
import {reply, createComment} from '../middleware/events/comments'
import { createEvent } from '../middleware/events/createEvent'
import {getEvents} from '../middleware/events/getEvents'

import {userJoi} from '../middleware/validation_schema'

const router = express.Router()

router.get('/', getUsers)
router.get('/events', getEvents)
router.get('/profile', requiresAuth, getProfile)
router.get("/eventProfile/:id", event)
router.get('/getEvents', requiresAuth, getEvents)

router.post('/register', userJoi, register)
router.post('/login', login)
router.post('/event', requiresAuth, createEvent)
router.post('/event/:id/createComment',requiresAuth, createComment)
router.post("/event/:event_id/comment/:comment_id/replyComment", requiresAuth, reply)
router.post('/upload',upload.single('image'), requiresAuth, uploadMedia)

router.patch('/user/:id', requiresAuth, updateUsers)


router.delete('/user/:id', deleteUser)
router.delete('/user', deleteAllUser)
router.delete('/event/:id', requiresAuth, deleteEvent)

export {router}