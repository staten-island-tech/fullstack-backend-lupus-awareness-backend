"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("./routes/index");
require("./DB/mongoose"); //ensures mongoose connects
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
//raw requests are now usable properties on req.body
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true
}));
app.use('/', index_1.router);
app.listen(port, () => {
    console.log(`server is up on port ${port}`);
});
