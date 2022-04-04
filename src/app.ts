import express from 'express';
import cors from 'cors'
import { Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import { router } from './routes/index'
import './DB/mongoose'
import dotenv from 'dotenv'
import fileupload from 'express-fileupload'
dotenv.config()


const cloudinary = require("cloudinary").v2

const app = express();
const port = process.env.PORT || 3000

// Enable the use of request body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors())

//raw requests are now usable properties on req.body
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use('/', router)
app.listen(port, ()=> {
    console.log(`server is up on port ${port}`)
})

cloudinary.config({ 
  cloud_name: 'lupusawareness', 
  api_key: '134957693676947', 
  api_secret: 'huc9zI1E2pJs3vJ1vzkoWEncx7s' 
});
console.log(cloudinary.config().cloud_name)

// const fileupload = require("express-fileupload");
app.use(fileupload());