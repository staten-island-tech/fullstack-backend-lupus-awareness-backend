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
exports.deleteUser = exports.updateUsers = exports.login = exports.createUser = exports.getUsers = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// import Joi from 'joi'
// const joiSchema= {
//     firstName: Joi.string().required(),
//     lastName: Joi.string().required(),
//     email: Joi.string().required().email(),
//     password: Joi.string().min(6).required()
// }
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
        // //validate user
        // const validUser = joiSchema.validate(req.body)
        //find an existing user
        let user = yield User_1.User.findOne({ email: req.body.email });
        if (user)
            return res.status(400).send("User already registered.");
        user = new User_1.User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
        });
        user.password = yield bcryptjs_1.default.hash(user.password, 10);
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
        const validPassword = yield bcryptjs_1.default.compareSync(password, existingUser.password);
        if (!validPassword) {
            res.json('not valid');
            return;
        }
        console.log('valid');
        const payload = {
            id: existingUser === null || existingUser === void 0 ? void 0 : existingUser._id,
            firstName: existingUser === null || existingUser === void 0 ? void 0 : existingUser.firstName,
            email: existingUser === null || existingUser === void 0 ? void 0 : existingUser.email,
            role: existingUser === null || existingUser === void 0 ? void 0 : existingUser.role
        };
        const userToken = jsonwebtoken_1.default.sign(payload, process.env.PRIVATEKEY);
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
// export const getProfile = async (req: Request, res: Response) => {
//     try {
//        const user = await User.findOne({ email: req.oidc.user.email}).exec();
//         // const user = await User.findById(id)
//         // res.send(req.oidc.idToken)
//         res.send(user)
//     } catch (error) {
//         console.log(error)
//     }
// }
