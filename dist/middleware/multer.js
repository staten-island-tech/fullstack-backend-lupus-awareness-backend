"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
const upload = (0, multer_1.default)({
    limits: {
        fileSize: 2000000
    },
    //  storage: multer.diskStorage({}),
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error("Please upload a jpg, jpeg or png only"));
        }
        cb(null, true);
    }
});
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "DEV",
//   },
// });
module.exports = upload;
