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
exports.deleteAllEvent = exports.interested = exports.updateEvents = exports.deleteEvent = exports.event = exports.allEvents = void 0;
const User_1 = require("../models/User");
const Event_1 = require("../models/Event");
const allEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let events = yield Event_1.Event.find().limit(5);
        // events.forEach((el) => {
        //     let event: EventData = {
        //       user: el!.user,
        //       date: el!.date,
        //       hours: el!.hours,
        //       location: el!.location,
        //       description: el!.description,
        //       media: el!.media,
        //       numberInterested: el!.numberInterested,
        //       numberComments: el!.numberComments,
        //       slug: el!.slug
        //     } 
        //     console.log(event)
        //   //   res.json(event)
        // })
        res.json(events);
    }
    catch (error) {
        res.json(error);
    }
});
exports.allEvents = allEvents;
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
const updateEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield Event_1.Event.findById(req.params.id);
        const updates = Object.keys(req.body);
        updates.forEach((e) => (event[e] = req.body[e]));
        yield event.save();
        res.json(updates);
    }
    catch (error) {
        res.json(error);
    }
});
exports.updateEvents = updateEvents;
const interested = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body.payload;
        const event = yield Event_1.Event.findOne({ _id: req.params.id });
        const user = yield User_1.User.findOne({ _id: payload._id });
        // if(user?.interestedEvents._id = event._id){
        //     res.json('You are already interested in this event')
        //     return
        // }
        res.json(user);
        // await Event.findOneAndUpdate(
        //     {_id: req.params.id},
        //     { $push: { interestedUsers: user}}
        // )
        // await User.findOneAndUpdate(
        //     {_id: payload._id},
        //     { $push: { interestedEvents: event}}
        // )
    }
    catch (error) {
        console.log(error);
    }
});
exports.interested = interested;
const deleteAllEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield Event_1.Event.deleteMany({ role: 'viewer' });
        res.json(`${event} deleted`);
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteAllEvent = deleteAllEvent;
