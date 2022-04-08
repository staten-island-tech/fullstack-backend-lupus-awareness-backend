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
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const upload = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const upload = (0, multer_1.default)({
            limits: {
                fileSize: 2000000
            },
            fileFilter(req, file, cb) {
                if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                    return cb(new Error("Please upload a jpg, jpeg or png only"));
                }
                cb(null, true);
            }
        });
        upload.single('image');
        next();
    }
    catch (error) {
        res.json(error);
    }
});
exports.upload = upload;
