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
exports.test = exports.deleteUser = exports.updateUsers = exports.getUsers = exports.createUser = void 0;
const User_1 = require("../models/User");
const User = User_1.userModel;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authResponse = req.oidc.user;
        const newUser = new User(req.body);
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
const test = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        function create(user, callback) {
            const bcrypt = require('bcrypt');
            const MongoClient = require('mongodb@3.1.4').MongoClient;
            const client = new MongoClient('mongodb+srv://jwang:Seagull485@cluster0.zs7ne.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
            client.connect(function (err) {
                if (err)
                    return callback(err);
                const db = client.db('myFirstDatabase');
                const users = db.collection('users');
                users.findOne({ email: user.email }, function (err, withSameMail) {
                    if (err || withSameMail) {
                        client.close();
                        return callback(err || new Error('the user already exists'));
                    }
                    bcrypt.hash(user.password, 10, function (err, hash) {
                        if (err) {
                            client.close();
                            return callback(err);
                        }
                        user.password = hash;
                        users.insert(user, function (err, inserted) {
                            client.close();
                            if (err)
                                return callback(err);
                            callback(null);
                        });
                    });
                });
            });
        }
    }
    catch (error) {
        res.json(error);
    }
});
exports.test = test;
