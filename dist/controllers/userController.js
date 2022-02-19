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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.deleteUser = exports.updateUsers = exports.getUsers = exports.createUser = void 0;
const User_1 = require("../models/User");
const User = User_1.userModel;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authResponse = req.oidc.user;
        const newUser = new User(req.body);
        req.body.email = newUser.email;
        yield newUser.save();
        res.json(newUser);
        console.log(newUser);
    }
    catch (error) {
        res.json(error);
    }
});
exports.createUser = createUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.setHeader('Access-Control-Allow-Origin', "http://localhost:8081");
        const Users = yield User.find();
        // let { token_type, access_token } = req.oidc.accessToken;
        res.json(Users);
        console.log(req.oidc.accessToken);
    }
    catch (error) {
        res.json(error);
    }
});
exports.getUsers = getUsers;
const updateUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findOne({ email: req.oidc.user.email }).exec();
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
        const user = yield User.findByIdAndDelete(req.params.id);
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
        const user = yield User.findOne({ email: req.oidc.user.email }).exec();
        // const user = await User.findById(id)
        res.send(req.oidc.accessToken);
        // res.send(user)
    }
    catch (error) {
        console.log(error);
    }
});
exports.getProfile = getProfile;
