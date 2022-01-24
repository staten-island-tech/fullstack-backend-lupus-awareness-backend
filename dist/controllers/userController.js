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
exports.deleteUser = exports.updateUsers = exports.getUsers = exports.createUser = void 0;
const User_1 = require("../models/User");
const User = User_1.userModel;
const bcrypt_1 = __importDefault(require("bcrypt"));
const salt = 10;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = new User(req.body);
        bcrypt_1.default.genSalt(salt, function (err, salt) {
            bcrypt_1.default.hash(newUser.password, salt, function (err, hash) {
                newUser.password = hash;
                console.log(hash);
            });
        });
        yield newUser.save();
        res.json(newUser);
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
        const user = yield User.findById(req.params.id);
        const updates = Object.keys(req.body);
        updates.forEach((e) => (user[e] = req.body[e]));
        yield user.save();
        console.log(user);
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
        res.json(`${user.name} was deleted from DB`);
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteUser = deleteUser;
