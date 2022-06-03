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
exports.unsubscribe = exports.subscribe = exports.deleteAllUser = exports.getProfile = exports.deleteUser = exports.updateUsers = exports.getUsers = void 0;
const User_1 = require("../models/User");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let count = 0;
        let limitedNumber = count + 5;
        count = limitedNumber;
        // const Users = await User.find().limit(limitedNumber)
        res.json(count);
    }
    catch (error) {
        res.json(error);
    }
});
exports.getUsers = getUsers;
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
        // res.json(user)
        console.log(req.body.payload);
        res.json(user);
        // console.log(req.body.payload.email)
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
const subscribe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let me = yield User_1.User.findOne({ _id: req.body.payload._id });
        let user = yield User_1.User.findOne({ _id: req.params.id });
        me.subscribed.push(user._id);
        user.subscribers.push(me._id);
        me.save();
        user.save();
        // res.json(me!.subscribed)
        res.json(me);
        console.log(user);
    }
    catch (error) {
        console.log(error);
    }
});
exports.subscribe = subscribe;
const unsubscribe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let me = yield User_1.User.findOne({ _id: req.body.payload._id });
        let user = yield User_1.User.findOne({ _id: req.params.id });
        if (user.subscribers.includes(req.body.payload._id)) {
            yield User_1.User.findOneAndUpdate({ _id: req.body.payload._id }, { $pull: { subscribed: user._id } });
            yield User_1.User.findOneAndUpdate({ _id: req.params.id }, { $pull: { subscribers: me._id } });
        }
        // me!.save()
        // user!.save()
        // res.json(me!.subscribed)
        res.json(me);
        console.log(user);
    }
    catch (error) {
        console.log(error);
    }
});
exports.unsubscribe = unsubscribe;
