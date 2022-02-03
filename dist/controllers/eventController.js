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
exports.createEvent = void 0;
const Event_1 = require("../models/Event");
const Event = Event_1.eventModel;
// import { stringify } from 'querystring'
// import jwksRsa from 'jwks-rsa'
// import jwt from 'express-jwt'
// import jwtAuthz from 'express-jwt-authz'
// import { isShorthandPropertyAssignment } from 'typescript'
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.oidc.user;
        const newEvent = new Event(req.body);
        req.body.user = user;
        console.log(req.body);
        yield newEvent.save();
        res.json(newEvent);
    }
    catch (error) {
        res.json(error);
    }
});
exports.createEvent = createEvent;
