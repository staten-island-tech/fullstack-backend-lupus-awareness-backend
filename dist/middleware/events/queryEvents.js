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
exports.queryEvents = void 0;
const Event_1 = require("../../models/Event");
const queryEvents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let events = yield Event_1.Event.find();
        res.json(events);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.queryEvents = queryEvents;
