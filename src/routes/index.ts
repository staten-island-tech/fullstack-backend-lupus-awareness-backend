import express from 'express'
const upload = require('../middleware/events/multer')

//user middleware
import {getUsers, updateUsers, deleteUser, deleteAllUser, getProfile, subscribe, unsubscribe} from '../middleware/userMiddleware'
import {login} from '../middleware/user/login'
import { logout } from '../middleware/user/logout'
import {register} from '../middleware/user/register'
// import { requiresAuth } from '../middleware/user/token'
import { requiresAuth } from '../middleware/user/token'
import { sendUser } from '../middleware/user/token'
import { uploadProf, uploadEvent } from '../middleware/cloudinary'
import { showInterest, allInterested, populateUser, userInterested } from '../middleware/events/userInterested'
import { searchUser } from '../middleware/user/searchUser'

//event middleware
import {queryEvents} from '../middleware/events/queryEvents'
import { allEvents, event, deleteEvent, deleteAllEvent} from '../middleware/eventMiddleware'
import { createComment, allComments, deleteComment, findComment, populateComments, reply} from '../middleware/events/comments'
import { createEvent } from '../middleware/events/createEvent'
import {getEvents} from '../middleware/events/getEvents'
import {userJoi} from '../middleware/validation_schema'

const router = express.Router()

router.get('/', getUsers)
router.get('/auth', requiresAuth, sendUser)
router.get('/events', queryEvents)
router.get('/searchUser/:query',  searchUser)
router.get("/eventProfile/:id", event)
router.get("/comment/:id", findComment)
router.get('/getEvents', requiresAuth, getEvents)
router.get('/comments', allComments)
router.get('/comments/:id', requiresAuth, populateComments)
router.get('/interested', allInterested)
router.get('/interested/:id', requiresAuth, populateUser)
router.get('/user/interestedEvents', requiresAuth, userInterested)

router.post('/register', userJoi, register)
router.post('/login', login)
router.post('/logout', logout)
router.post('/event', createEvent)
router.post('/event/:id/createComment', requiresAuth, createComment)
router.post("/comment/:comment_id/replyComment", requiresAuth, reply)
router.post('/event/:id/uploadEvent', requiresAuth,  upload.array('image'),uploadEvent)
router.post('/user/subscribe/:id', requiresAuth, subscribe)
router.post('/user/unsubscribe/:id', requiresAuth, unsubscribe)
router.post('/event/:id/showInterest', requiresAuth, showInterest)
// router.post('/comment/:id', requiresAuth, likeComment)

router.patch('/user/profilePic',  requiresAuth , upload.single('image'),uploadProf)
router.patch('/user/:id', requiresAuth, updateUsers)


router.delete('/user/:id', deleteUser)
router.delete('/user', deleteAllUser)
router.delete('/event', deleteAllEvent)
router.delete('/event/:id', requiresAuth, deleteEvent)
router.delete('/comments', deleteComment)

export {router}