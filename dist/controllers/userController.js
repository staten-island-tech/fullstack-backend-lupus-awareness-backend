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
exports.updateUsers = exports.getUsers = exports.createUser = exports.homePage = exports.authPage = exports.authMiddleware = void 0;
const User_1 = require("../models/User");
const User = User_1.userModel;
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.user) {
        next();
    }
    else {
        res.json('sign in please');
    }
});
exports.authMiddleware = authMiddleware;
const authPage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(`hello, ${req.body.user}`);
    }
    catch (error) {
        console.log(error);
    }
});
exports.authPage = authPage;
const homePage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = {
        id: 1234,
        name: 'bob',
        admin: false,
        gender: 'unspecified'
    };
    try {
        res.json(newUser);
    }
    catch (error) {
        console.log(error);
    }
});
exports.homePage = homePage;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = new User(req.body);
        yield user.save();
        res.json(user);
    }
    catch (error) {
        res.json(error);
    }
});
exports.createUser = createUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Users = yield User.find();
        res.json(Users);
    }
    catch (error) {
        res.json(error);
    }
});
exports.getUsers = getUsers;
const updateUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // interface IObjectKeys {
        //     [key: string]: string | number;
        //   }
        const Users = yield User.findById(req.params.id);
        const updates = Object.keys(req.body);
        updates.forEach((e) = (Users[e] = req.body[e]));
        console.log(updates);
        res.json(updates);
    }
    catch (error) {
        res.json(error);
    }
});
exports.updateUsers = updateUsers;
