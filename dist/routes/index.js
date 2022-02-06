"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const express_openid_connect_1 = require("express-openid-connect");
const { requiresAuth } = require("express-openid-connect");
const userController_1 = require("../controllers/userController");
const eventController_1 = require("../controllers/eventController");
const router = express_1.default.Router();
exports.router = router;
router.get("/", userController_1.getUsers);
router.get("/user", userController_1.createUser);
router.post("/login", userController_1.createUser);
router.patch("/user/:id", userController_1.updateUsers);
router.delete("/user/:id", userController_1.deleteUser);
router.get("/get", userController_1.test); //test
router.post(
  "/event",
  (0, express_openid_connect_1.requiresAuth)(),
  eventController_1.createEvent
);
