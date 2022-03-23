"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replyComment = exports.Comment = exports.Event = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const privateKey = process.env.PRIVATEKEY;
const commentSchema = new mongoose_1.Schema({
    user: { type: {}, required: false },
    date: { type: Date, required: false },
    content: { type: String, required: true },
    likes: { type: Number, required: false },
    replies: { type: [], required: true },
});
const replySchema = new mongoose_1.Schema({
    user: { type: {}, required: false },
    date: { type: Date, required: false },
    content: { type: String, required: true },
    likes: { type: Number, required: false },
});
const eventSchema = new mongoose_1.Schema({
    user: { type: {}, required: true },
    date: { type: Date, required: true },
    hours: { type: Number },
    location: { type: String, required: true },
    description: { type: String, required: true },
    media: { type: [], required: true },
    interestedUsers: { type: [], default: [], required: true },
    comments: { type: [], default: [], required: true },
    slug: String
});
const replyComment = mongoose_1.default.model('replyComment', replySchema);
exports.replyComment = replyComment;
const Comment = mongoose_1.default.model('Comment', commentSchema);
exports.Comment = Comment;
const Event = mongoose_1.default.model('Event', eventSchema);
exports.Event = Event;
