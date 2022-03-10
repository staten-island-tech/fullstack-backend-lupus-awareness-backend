"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("./routes/index");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
require("./DB/mongoose"); //ensures mongoose connects
const express_openid_connect_1 = require("express-openid-connect");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: ' a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:3000',
    clientID: 'W27qMzcn1MeFLgZFreqtfjYLppDKeUcK',
    issuerBaseURL: 'https://lupusawareness.us.auth0.com'
};
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use((0, express_openid_connect_1.auth)(config));
//enable cors
app.use((0, cors_1.default)({
    origin: "*"
}));
// app.get('/', function (req, res, next) {
//   res.send(data)
// })
app.listen(8080, function () {
    console.log('CORS-enabled web server listening on port 3000');
});
// Enable the use of request body parsing middleware
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
//raw requests are now usable properties on req.body
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true
}));
app.use('/', index_1.router);
app.listen(port, () => {
    console.log(`server is up on port ${port}`);
});
// req.isAuthenticated is provided from the auth router
