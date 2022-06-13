import express from 'express';
import cors from 'cors'
import { Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { router } from './routes/index'
import './DB/mongoose'
import dotenv from 'dotenv'
dotenv.config()

const cloudinary = require("cloudinary").v2

const app = express();
const port =  3000

// Enable the use of request body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser())

app.use(cors({ 
  origin: 'http://localhost:8080',
  credentials: true
}))

//raw requests are now usable properties on req.body
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET, 
});

// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   // res.setHeader("Access-Control-Allow-Credentials", true);
//   next();
// });

app.use('/', router)
app.listen(port, ()=> {
    console.log(`server is up on port ${port}`)
})

