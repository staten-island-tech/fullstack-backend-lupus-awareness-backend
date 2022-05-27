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
exports.sendUser = exports.requiresAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const requiresAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies['auth-token'];
    if (!token)
        return res.json('access denied');
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.PRIVATEKEY);
        req.body.payload = payload;
        next();
    }
    catch (error) {
        res.json(error);
    }
});
exports.requiresAuth = requiresAuth;
const sendUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(req.body.payload);
    }
    catch (error) {
        res.json(error);
    }
});
exports.sendUser = sendUser;
