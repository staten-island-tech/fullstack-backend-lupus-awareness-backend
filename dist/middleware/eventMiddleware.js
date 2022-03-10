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
const User_1 = require("../models/User");
const Event_1 = require("../models/Event");
const createEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        let user = yield User_1.User.findOne({ email: req.body.email });
        const event = new Event_1.Event({
            user: user,
            date: new Date(),
            location: req.body.location,
            description: req.body.description
        });
        yield event.save();
        res.json(event);
    }
    catch (error) {
        res.json(error);
    }
});
exports.createEvent = createEvent;
