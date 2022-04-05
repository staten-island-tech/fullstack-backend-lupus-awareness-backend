"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
//user middleware
const userMiddleware_1 = require("../middleware/userMiddleware");
const login_1 = require("../middleware/auth/login");
const register_1 = require("../middleware/auth/register");
const token_1 = require("../middleware/auth/token");
//event middleware
const eventMiddleware_1 = require("../middleware/eventMiddleware");
const cloudinary_1 = require("../middleware/cloudinary");
const token_1 = require("../middleware/token");
const validation_schema_1 = require("../middleware/validation_schema");
const router = express_1.default.Router();
exports.router = router;
router.get('/', userMiddleware_1.getUsers);
router.get('/events', eventMiddleware_1.getEvents);
router.get('/profile', token_1.requiresAuth, userMiddleware_1.getProfile);
router.get("/eventProfile/:id", eventMiddleware_1.event);
router.post('/register', validation_schema_1.userJoi, userMiddleware_1.createUser);
router.post('/login', userMiddleware_1.login);
router.post('/event', token_1.requiresAuth, eventMiddleware_1.createEvent);
router.post('/event/:id/createComment', token_1.requiresAuth, eventMiddleware_1.createComment);
router.post("/event/:event_id/comment/:comment_id/replyComment", token_1.requiresAuth, eventMiddleware_1.reply);
router.post('/avatar', cloudinary_1.uploadMedia);
router.patch('/user/:id', token_1.requiresAuth, userMiddleware_1.updateUsers);
router.delete('/user/:id', userMiddleware_1.deleteUser);
router.delete('/user', userMiddleware_1.deleteAllUser);
router.delete('/event/:id', token_1.requiresAuth, eventMiddleware_1.deleteEvent);
