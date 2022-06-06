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
exports.uploadEvent = exports.uploadProf = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = require("../models/User");
const Event_1 = require("../models/Event");
dotenv_1.default.config();
const cloudinary = require("cloudinary").v2;
// import { cloudinary, uploader } from 'cloudinary'
//Upload profile image
const uploadProf = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        res.json(req.body.payload._id);
        let user = yield User_1.User.findOne({ _id: req.body.payload._id });
        console.log(user._id);
        const imageFile = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
        console.log(imageFile);
        cloudinary.uploader.upload(imageFile, {
            folder: "Fullstack/Profile"
        }, function (error, result) { console.log(result, error); })
            .then((result) => __awaiter(void 0, void 0, void 0, function* () {
            const image = result.url;
            console.log(image);
            yield User_1.User.updateOne({ '_id': req.body.payload._id }, { $set: { avatar: image } });
            res.json(user);
        }));
    }
    catch (error) {
        res.json(error);
        console.log(error);
    }
});
exports.uploadProf = uploadProf;
//Upload event images
const uploadEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield Event_1.Event.findOne({ _id: req.params.id });
        const imageFiles = req.files;
        imageFiles === null || imageFiles === void 0 ? void 0 : imageFiles.forEach((el) => {
            console.log(el.path);
            const file = el.path;
            cloudinary.uploader.upload(file, {
                folder: "Fullstack/Event"
            }, function (error, result) { console.log(result, error); })
                .then((result) => __awaiter(void 0, void 0, void 0, function* () {
                const image = result.url;
                console.log(image);
                yield Event_1.Event.updateOne({ '_id': req.params.id }, { $push: { media: image } });
            }));
        });
        res.json(imageFiles);
    }
    catch (error) {
        res.json(error);
        console.log(error);
    }
});
exports.uploadEvent = uploadEvent;
