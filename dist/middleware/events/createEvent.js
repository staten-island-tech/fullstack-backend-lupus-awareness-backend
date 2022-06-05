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
const User_1 = require("../../models/User");
const Event_1 = require("../../models/Event");
const createEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    // if(req.body.payload.role === Role.Student) {return res.json('Students cannot create events')}
    try {
        const event = new Event_1.Event({
            user: req.body.payload,
            name: req.body.name,
            hours: req.body.hours,
            start: req.body.start,
            end: req.body.end,
            // location: req.body.location,
            description: req.body.description,
            media: req.body.media,
            tags: req.body.tags
        });
        yield event.save();
        yield User_1.User.findOneAndUpdate({ _id: req.body.payload._id }, { $push: { events: event._id } });
        res.json(event);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.createEvent = createEvent;
