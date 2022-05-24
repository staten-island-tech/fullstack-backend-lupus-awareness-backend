import express from 'express'
const upload = require('../middleware/events/multer')

//user middleware
import {getUsers, updateUsers, deleteUser, deleteAllUser, getProfile, subscribe} from '../middleware/userMiddleware'
import {login} from '../middleware/user/login'
import { logout } from '../middleware/user/logout'
import {register} from '../middleware/user/register'
// import { requiresAuth } from '../middleware/user/token'
import { requiresAuth } from '../middleware/user/token'
import { sendUser } from '../middleware/user/token'
import { uploadProf, uploadEvent } from '../middleware/cloudinary'

//event middleware
import { allEvents, event, deleteEvent, interested, deleteAllEvent} from '../middleware/eventMiddleware'
import {reply, createComment, allComments, deleteComment, findComment, test} from '../middleware/events/comments'
import { createEvent } from '../middleware/events/createEvent'
import {getEvents} from '../middleware/events/getEvents'
import {userJoi} from '../middleware/validation_schema'

const router = express.Router()

router.get('/', getUsers)
router.get('/auth', requiresAuth, sendUser)
router.get('/events', allEvents)
router.get('/profile', requiresAuth, getProfile)
router.get("/eventProfile/:id", event)
router.get("/comment/:id", findComment)
router.get('/getEvents', requiresAuth, getEvents)
router.get('/comments', allComments)
router.get('/comments/:id', test)

router.post('/register', userJoi, register)
router.post('/login', login)
router.post('/logout', logout)
router.post('/event', requiresAuth, createEvent)
router.post('/event/:id/createComment', requiresAuth, createComment)
router.post("/event/:event_id/comment/:comment_id/replyComment", requiresAuth, reply)
router.post('/event/:id/uploadEvent', upload.array('image'), requiresAuth, uploadEvent)
router.post('/event/:id/interested', requiresAuth, interested)
router.post('user/subscribe', requiresAuth, subscribe)

router.patch('/upload',upload.single('image'), requiresAuth, uploadProf)
router.patch('/user/:id', requiresAuth, updateUsers)


router.delete('/user/:id', deleteUser)
router.delete('/user', deleteAllUser)
router.delete('/event', deleteAllEvent)
router.delete('/event/:id', requiresAuth, deleteEvent)
router.delete('/comments', deleteComment)

export {router}