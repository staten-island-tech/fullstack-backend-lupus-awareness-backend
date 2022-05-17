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
exports.findComment = exports.deleteComment = exports.allComments = exports.reply = exports.createComment = void 0;
const Event_1 = require("../../models/Event");
const User_1 = require("../../models/User");
const Comment_1 = require("../../models/Comment");
const crypto_1 = __importDefault(require("crypto"));
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findOne({ _id: req.body.payload._id });
        const userId = user._id;
        let initial = 0;
        // const event = await Event.findOne({ _id: req.params.id })
        // if(!event){
        //     res.json("This event doesn't exist")
        // }
        const comment = new Comment_1.Comment({
            user: userId,
            event: req.params.id,
            date: new Date(),
            content: req.body.content,
            likes: [],
            replies: [],
        });
        yield comment.save();
        // const commentId = crypto.randomBytes(16).toString('hex')
        // const comment: CommentInterface = {
        //     comment_id: commentId,
        //     user: event!.user,
        //     date: new Date,
        //     content: req.body.content,
        //     likes: [],
        //     replies: []
        // }
        yield Event_1.Event.updateOne({ '_id': req.params.id }, { $set: { comments: comment } });
        res.json(comment);
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
        // const reply: CommentInterface = {
        //     comment_id: replyId,
        //     user: event!.user,
        //     date: new Date,
        //     content: req.body.content,
        //     likes: [],
        //     replies: []
        // }
        yield Event_1.Event.findOneAndUpdate({ '_id': eventId, "comments.comment_id": commentId }, { $push: { "comments.$.replies": exports.reply } });
        res.json(event);
    }
    catch (error) {
        res.json(error);
    }
});
exports.reply = reply;
const allComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield Comment_1.Comment.find();
        res.json(comments);
    }
    catch (error) {
        res.json(error);
    }
});
exports.allComments = allComments;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield Comment_1.Comment.find({ _id: '623678cbcb8c883ac7f1dee9' });
        res.json(`${comments} deleted`);
    }
    catch (error) {
        res.json(error);
    }
});
exports.deleteComment = deleteComment;
const findComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.params.id);
        const comment = yield Comment_1.Comment.findOne({ _id: req.params.id });
        if (!comment) {
            res.json("This comment doesn't exist");
        }
        res.json(comment);
    }
    catch (error) {
        res.json(error);
    }
});
exports.findComment = findComment;
