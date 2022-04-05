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
// cloudinary.api.create_upload_preset({
//     name: 'demo_preset',
//     tags: 'baby, winter, snow',
//     folder: 'babies',
//     allowed_formats: 'jpg, png'
//   })
//   .then((uploadResult: any) => console.log(uploadResult))
//   .catch((error:any) => console.error(error));
const uploadMedia = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // cloudinary.uploader
        // .upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg", 
        // { public_id: "olympic_flag" }, 
        // function (error:any, result: any) { console.log(result, error); });
        // const imageFile = req.files
        // const file = req.files!.file
        res.json(req);
    }
    catch (error) {
        res.json(error);
    }
});
exports.uploadMedia = uploadMedia;
