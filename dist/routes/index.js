"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const upload = require('../middleware/events/multer');
//user middleware
const userMiddleware_1 = require("../middleware/userMiddleware");
const login_1 = require("../middleware/user/login");
const register_1 = require("../middleware/user/register");
// import { requiresAuth } from '../middleware/user/token'
const requiresAuth = require('../middleware/user/token');
const cloudinary_1 = require("../middleware/cloudinary");
//event middleware
const eventMiddleware_1 = require("../middleware/eventMiddleware");
const comments_1 = require("../middleware/events/comments");
const createEvent_1 = require("../middleware/events/createEvent");
const getEvents_1 = require("../middleware/events/getEvents");
const validation_schema_1 = require("../middleware/validation_schema");
const router = express_1.default.Router();
exports.router = router;
router.get('/', userMiddleware_1.getUsers);
router.get('/events', eventMiddleware_1.allEvents);
router.get('/profile', requiresAuth, userMiddleware_1.getProfile);
router.get("/eventProfile/:id", eventMiddleware_1.event);
router.get("/comment/:id", comments_1.findComment);
router.get('/getEvents', requiresAuth, getEvents_1.getEvents);
router.get('/comments', comments_1.allComments);
router.get('/comments/:id', comments_1.test);
router.post('/register', validation_schema_1.userJoi, register_1.register);
router.post('/login', login_1.login);
router.post('/event', requiresAuth, createEvent_1.createEvent);
router.post('/event/:id/createComment', requiresAuth, comments_1.createComment);
router.post("/event/:event_id/comment/:comment_id/replyComment", requiresAuth, comments_1.reply);
router.post('/event/:id/uploadEvent', upload.array('image'), requiresAuth, cloudinary_1.uploadEvent);
router.post('/event/:id/interested', requiresAuth, eventMiddleware_1.interested);
router.post('user/subscribe', requiresAuth, userMiddleware_1.subscribe);
router.patch('/upload', upload.single('image'), requiresAuth, cloudinary_1.uploadProf);
router.patch('/user/:id', requiresAuth, userMiddleware_1.updateUsers);
router.delete('/user/:id', userMiddleware_1.deleteUser);
router.delete('/user', userMiddleware_1.deleteAllUser);
router.delete('/event', eventMiddleware_1.deleteAllEvent);
router.delete('/event/:id', requiresAuth, eventMiddleware_1.deleteEvent);
router.delete('/comments', comments_1.deleteComment);
