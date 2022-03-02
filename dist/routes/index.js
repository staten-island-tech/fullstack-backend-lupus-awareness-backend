"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const express_openid_connect_1 = require("express-openid-connect");
const eventController_1 = require("../controllers/eventController");
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
exports.router = router;
router.get('/', userController_1.getUsers);
router.patch('/user/:id', (0, express_openid_connect_1.requiresAuth)(), userController_1.updateUsers);
router.delete('/user/:id', userController_1.deleteUser);
router.get('/profile', (0, express_openid_connect_1.requiresAuth)(), userController_1.getProfile);
router.get('/dashboard', (0, express_openid_connect_1.requiresAuth)(), userController_1.getProfile);
router.patch('/dashboard', (0, express_openid_connect_1.requiresAuth)(), userController_1.updateUsers);
router.post('/event', (0, express_openid_connect_1.requiresAuth)(), eventController_1.createEvent);
