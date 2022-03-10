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
exports.Event = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const User_1 = require("./User");
const privateKey = process.env.PRIVATEKEY;
const eventSchema = new mongoose_1.Schema({
    user: { type: User_1.userSchema, required: true },
    date: { type: Date, required: true },
    hours: { type: Number },
    location: { type: String, required: true },
    description: { type: String, required: true },
    interestedUsers: { type: [], default: [], required: true },
    comments: { type: [], default: [], required: true },
    slug: String
});
const Event = mongoose_1.default.model('Event', eventSchema);
exports.Event = Event;
