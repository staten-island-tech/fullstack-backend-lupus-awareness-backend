"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const userMiddleware_1 = require("../middleware/userMiddleware");
const eventMiddleware_1 = require("../middleware/eventMiddleware");
const token_1 = require("../middleware/token");
const validation_schema_1 = require("../middleware/validation_schema");
const router = express_1.default.Router();
exports.router = router;
router.get('/', userMiddleware_1.getUsers);
router.post('/register', validation_schema_1.userJoi, userMiddleware_1.createUser);
router.post('/login', userMiddleware_1.login);
router.patch('/user/:id', userMiddleware_1.updateUsers);
router.delete('/user/:id', userMiddleware_1.deleteUser);
router.post('/event', token_1.requiresAuth, eventMiddleware_1.createEvent);
router.get('/events', eventMiddleware_1.getEvents);
router.delete('/user', userMiddleware_1.deleteAllUser);
router.get('/profile', token_1.requiresAuth, userMiddleware_1.getProfile);
router.post('/event/:id/createComment', token_1.requiresAuth, eventMiddleware_1.createComment);
router.post("/event/:event_id/comment/:id/replyComment", token_1.requiresAuth, eventMiddleware_1.reply);
router.get("/eventProfile/:id", eventMiddleware_1.event);
