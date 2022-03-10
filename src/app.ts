import express from 'express';
import cors from 'cors'
import { Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import { router } from './routes/index'
import './DB/mongoose'
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
