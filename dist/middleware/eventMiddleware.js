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
exports.deleteEvent = exports.reply = exports.createComment = exports.event = exports.getEvents = exports.createEvent = void 0;
const User_1 = require("../models/User");
const Event_1 = require("../models/Event");
const crypto_1 = __importDefault(require("crypto"));
const createEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = new Event_1.Event({
            user: req.body.payload,
            date: new Date(),
            location: req.body.location,
            description: req.body.description,
            media: req.body.media
        });
        console.log(event);
        yield event.save();
        res.json(event);
    }
    catch (error) {
        res.json(error);
    }
});
exports.createEvent = createEvent;
const getEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Events = yield Event_1.Event.find();
        res.json(Events);
    }
    catch (error) {
        res.json(error);
    }
});
exports.getEvents = getEvents;
const event = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield Event_1.Event.findOne({ _id: req.params.id });
        if (!event) {
            res.json("This event doesn't exist");
        }
        res.json(event);
    }
    catch (error) {
        res.json(error);
    }
});
exports.event = event;
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield Event_1.Event.findOne({ _id: req.params.id });
        if (!event) {
            res.json("This event doesn't exist");
        }
        const commentId = crypto_1.default.randomBytes(16).toString('hex');
        const comment = {
            comment_id: commentId,
            user: event.user,
            date: new Date,
            content: req.body.content,
            likes: [],
            replies: []
        };
        yield Event_1.Event.updateOne({ '_id': req.params.id }, { $push: { comments: comment } });
        res.json(event);
    }
    catch (error) {
        res.json(error);
    }
});
exports.createComment = createComment;
const reply = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commentId = req.params.comment_id;
        const eventId = req.params.event_id;
        console.log(commentId);
        const event = yield Event_1.Event.findOne({ _id: eventId });
        if (!event) {
            res.json("This event doesn't exist");
        }
        const replyId = crypto_1.default.randomBytes(16).toString('hex');
        const reply = {
            comment_id: replyId,
            user: event.user,
            date: new Date,
            content: req.body.content,
            likes: [],
            replies: []
        };
        yield Event_1.Event.findOneAndUpdate({ '_id': eventId, "comments.comment_id": commentId }, { $push: { "comments.$.replies": reply } });
        res.json(event);
    }
    catch (error) {
        res.json(error);
    }
});
exports.reply = reply;
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield User_1.User.findByIdAndDelete(req.params.id);
        if (!event) {
            res.status(404).send();
        }
        res.json(`${event.firstName} ${event.lastName} was deleted from DB`);
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteEvent = deleteEvent;
