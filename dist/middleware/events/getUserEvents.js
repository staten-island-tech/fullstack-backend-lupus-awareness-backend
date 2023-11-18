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
exports.getUserEvents = void 0;
const User_1 = require("../../models/User");
const Event_1 = require("../../models/Event");
const getUserEvents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params.id;
    try {
        const user = yield User_1.User.findById(params);
        const userEvents = yield Event_1.Event.find({
            '_id': {
                $in: user.events
            }
        });
        res.json(userEvents);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.getUserEvents = getUserEvents;
