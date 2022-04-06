"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const index_1 = require("./routes/index");
require("./DB/mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const connect_busboy_1 = __importDefault(require("connect-busboy"));
dotenv_1.default.config();
const cloudinary = require("cloudinary").v2;
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Enable the use of request body parsing middleware
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
app.use((0, cors_1.default)());
//raw requests are now usable properties on req.body
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true
}));
cloudinary.config({
    cloud_name: 'lupusawareness',
    api_key: '134957693676947',
    api_secret: 'huc9zI1E2pJs3vJ1vzkoWEncx7s'
});
//Enable File Upload
app.use((0, express_fileupload_1.default)());
app.use((0, connect_busboy_1.default)());
app.use('/', index_1.router);
app.listen(port, () => {
    console.log(`server is up on port ${port}`);
});
