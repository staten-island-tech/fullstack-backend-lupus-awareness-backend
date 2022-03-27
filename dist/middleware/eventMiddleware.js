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
exports.reply = exports.createComment = exports.event = exports.getEvents = exports.createEvent = void 0;
const Event_1 = require("../models/Event");
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
        // res.json(event)
        // if(event!){
        //     res.json("This event doesn't exist")
        // }
        const comment = new Event_1.Comment({
            content: req.body.content
        });
        res.json(comment);
        let commentInfo = yield comment.save();
        console.log(commentInfo);
        yield Event_1.Event.updateOne({ '_id': req.params.id }, { $push: { comments: commentInfo } });
        console.log(event);
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
        const event = yield Event_1.Event.findOne({
            // 'comments.content': "home",
            // 'comments._id': '623c9512b05b082ee54369d0'
            // 'comments.replies': []
            "comments._id": "6240ccaea107f4ad9fc79e08"
        });
        //    if(!event){
        //        res.json('event not found')
        //    }
        // console.log(req.params)
        const comment = new Event_1.Comment({
            content: req.body.content,
        });
        let commentInfo = yield comment.save();
        console.log(commentInfo);
        yield Event_1.Event.findOneAndUpdate({ '_id': eventId, 'comments._id': req.params.comment_id }, { $push: { "comments.$.replies": commentInfo } });
        res.json(event);
    }
    catch (error) {
        res.json(error);
    }
});
exports.reply = reply;
