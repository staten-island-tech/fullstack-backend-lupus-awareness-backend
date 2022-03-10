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
const router = express_1.default.Router();
exports.router = router;
router.get('/', userMiddleware_1.getUsers);
router.post('/register', userMiddleware_1.createUser);
router.post('/login', userMiddleware_1.login);
router.patch('/user/:id', userMiddleware_1.updateUsers);
router.delete('/user/:id', userMiddleware_1.deleteUser);
router.post('/event', token_1.requiresAuth, eventMiddleware_1.createEvent);
