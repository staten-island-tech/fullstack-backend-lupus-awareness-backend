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
exports.uploadMedia = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cloudinary = require("cloudinary").v2;
const uploadMedia = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const dUri = new Datauri(req)
        const fileBuffer = req.files.image.data;
        console.log(fileBuffer);
        res.json(fileBuffer.toString('base64url'));
        // const dataUri = (req: Request) => 
        // dUri.format(path.extname(req.files!.image.name).toString(), req.files!.image.data)
        // const file = dataUri(req).content
        // console.log(file)
        // cloudinary.uploader.upload(fileBuffer.toString('base64'), function(error: TypeError, result: any) {console.log(result, error)});
    }
    catch (error) {
        res.json(error);
        console.log(error);
    }
});
exports.uploadMedia = uploadMedia;
