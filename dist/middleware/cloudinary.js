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
        // const dUri = await datauri(req.files)
        // console.log(dUri)
        // console.log('req.body:', req.files)
        // const dataUri = (req: Request) => dUri!.format(path.extname(req.file!.originalname).toString(), req.file!.buffer)
        // const file = dataUri(req).content
        // res.json(file)
        // return cloudinary.uploader.upload(file).then((result: any) => {
        //     const image = result.url
        //     res.json(image)
        // }).catch((err: any) =>{
        //     res.json(err)
        // })
        //   res.json(imageFile!.name)
        res.json(req.files.image.data);
        console.log(req.file.image.data);
    }
    catch (error) {
        res.json(error);
        console.log(error);
    }
});
exports.uploadMedia = uploadMedia;
