"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventModel = void 0;
const mongoose_1 = require("mongoose");
const User_1 = require("./User");
const eventSchema = new mongoose_1.Schema({
    user: { type: User_1.userSchema, required: true },
    date: { type: Date, required: true },
    hours: { type: Number },
    location: { type: String, required: true },
    description: { type: String, required: true },
    interestedUsers: { required: true },
    comments: { type: [], required: true },
    slug: String
});
const eventModel = (0, mongoose_1.model)('Event', eventSchema);
exports.eventModel = eventModel;
