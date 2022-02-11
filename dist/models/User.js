"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const slugify_1 = __importDefault(require("slugify"));
const userSchema = new mongoose_1.Schema({
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "user", required: true },
    subscribers: { type: [], default: [], required: true },
    interestedEvents: { type: [], default: [], required: true },
    events: { type: [], default: [], required: true },
    avatar: { type: String, default: null },
    slug: String
});
exports.userSchema = userSchema;
const userModel = (0, mongoose_1.model)('User', userSchema);
exports.userModel = userModel;
userSchema.pre('save', function (next) {
    if (!this.isModified('name')) {
        next();
        return;
    }
    this.slug = (0, slugify_1.default)(this.name);
    next();
});
