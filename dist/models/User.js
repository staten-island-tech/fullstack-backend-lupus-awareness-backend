"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
exports.userSchema = exports.User = exports.Role = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const privateKey = process.env.PRIVATEKEY;
var Role;
(function (Role) {
    Role["Student"] = "Student";
    Role["Organization"] = "Organization";
    Role["Admin"] = "Admin";
})(Role = exports.Role || (exports.Role = {}));
const userSchema = new mongoose_1.Schema({
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    // role: {type: Role, default: Role.Viewer, required: true},
    role: { type: String, default: Role.Student, required: true },
    subscribers: { type: [], default: [], required: true },
    subscribed: { type: [], default: [], required: true },
    interestedEvents: { type: [], default: [], required: true },
    events: { type: [], default: [], required: true },
    avatar: { type: String, default: 'https://res.cloudinary.com/lupusawareness/image/upload/v1650405593/wugaaghxaiqoiidbitdi.jpg' },
    slug: String
});
exports.userSchema = userSchema;
const User = mongoose_1.default.model('User', userSchema);
exports.User = User;
