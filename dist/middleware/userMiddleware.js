"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllUser = exports.getProfile = exports.deleteUser = exports.updateUsers = exports.login = exports.createUser = exports.getUsers = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Users = yield User_1.User.find();
        res.json(Users);
    }
    catch (error) {
        res.json(error);
    }
});
exports.getUsers = getUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //find an existing user
        let doesExist = yield User_1.User.findOne({ email: req.body.email });
        if (doesExist)
            return res.status(400).send("User already registered.");
        const user = new User_1.User(req.body);
        user.password = yield bcryptjs_1.default.hash(req.body.password, 10);
        yield user.save();
        res.json(user);
    }
    catch (error) {
        console.log(error);
    }
});
exports.createUser = createUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const existingUser = yield User_1.User.findOne({ email });
        if (!existingUser) {
            res.json('email not registered');
        }
        const validPassword = bcryptjs_1.default.compareSync(password, existingUser.password);
        console.log(validPassword);
        if (!validPassword) {
            res.json('not valid');
            return;
        }
        console.log('valid');
        const payload = {
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            role: existingUser.role,
            subscribers: existingUser.subscribers,
            interestedEvents: existingUser.interestedEvents,
            events: existingUser.events
        };
        const userToken = jsonwebtoken_1.default.sign(payload, `${process.env.PRIVATEKEY}`);
        res.header('auth-token', userToken).send(userToken);
    }
    catch (error) {
        console.log(error);
    }
});
exports.login = login;
const updateUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findById(req.params.id);
        const updates = Object.keys(req.body);
        updates.forEach((e) => (user[e] = req.body[e]));
        yield user.save();
        res.json(updates);
    }
    catch (error) {
        res.json(error);
    }
});
exports.updateUsers = updateUsers;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).send();
        }
        res.json(`${user.firstName} ${user.lastName} was deleted from DB`);
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteUser = deleteUser;
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield User_1.User.findOne({ _id: req.body.payload._id });
        console.log(user);
        res.json(user);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getProfile = getProfile;
const deleteAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.deleteMany({ role: 'viewer' });
        res.json(`${user} deleted`);
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteAllUser = deleteAllUser;
