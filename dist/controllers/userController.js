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
exports.testing = exports.checkJwt = exports.deleteUser = exports.updateUsers = exports.getUsers = exports.createUser = void 0;
const jwks_rsa_1 = __importDefault(require("jwks-rsa"));
const express_jwt_1 = __importDefault(require("express-jwt"));
const User_1 = require("../models/User");
const User = User_1.userModel;
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
const checkJwt = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).send({ message: "This is the POST before the final/timesheets endpoint" });
        (0, express_jwt_1.default)({
            // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint
            secret: jwks_rsa_1.default.expressJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `https://lupusawareness.us.auth0.com/.well-known/jwks.json`
            }),
            // Validate the audience and the issuer
            audience: 'https://lupusawareness.us.auth0.com/api/v2/',
            issuer: 'https://lupusawareness.us.auth0.com/',
            algorithms: ['RS256']
        });
        next();
    }
    catch (error) {
        console.log(error);
    }
});
exports.checkJwt = checkJwt;
const testing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const timesheet = req.body;
        res.status(200).send({ message: "This is the POST /timesheets endpoint" });
    }
    catch (error) {
        console.log(error);
    }
});
exports.testing = testing;
