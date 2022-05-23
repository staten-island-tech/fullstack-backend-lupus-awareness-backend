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
exports.showInterest = void 0;
const Event_1 = require("../../models/Event");
const User_1 = require("../../models/User");
const Interested_1 = require("../../models/Interested");
const showInterest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findOne({ _id: req.body.payload._id });
        const userId = user._id;
        const event = yield Event_1.Event.findOne({ _id: req.params.id });
        let initial = event.numberInterested;
        let interestNumber = initial + 1;
        // console.log(event?.numberComments)
        // const event = await Event.findOne({ _id: req.params.id })
        // if(!event){
        //     res.json("This event doesn't exist")
        // }
        const interest = new Interested_1.Interested({
            user: user,
            event: req.params.id,
            date: new Date(),
        });
        yield interest.save();
        // const commentId = crypto.randomBytes(16).toString('hex')
        // const comment: CommentInterface = {
        //     comment_id: commentId,
        //     user: event!.user,
        //     date: new Date,
        //     content: req.body.content,
        //     likes: [],
        //     replies: []
        // }
        // await Event.updateOne(
        //     {'_id': req.params.id},
        //     { $set: { numberComments : commentNumber }}
        // )
        // console.log(commentNumber)
        res.json(interest);
    }
    catch (error) {
        res.json(error);
    }
});
exports.showInterest = showInterest;
