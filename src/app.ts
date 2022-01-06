import express from "express"
import { router } from './routes/index'
import jwt from 'express-jwt'
import jwksRsa from 'jwks-rsa'
import cors from 'cors'
import bodyParser from 'body-parser'
import './DB/mongoose' //ensures mongoose connects

const port = process.env.PORT || 3000
const app = express();

//enable cors
app.use(cors())

// Enable the use of request body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//raw requests are now usable properties on req.body
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// Create timesheets API endpoint
app.post('/timesheets', function(req, res){
    res.status(201).send({message: "This is the POST /timesheets endpoint"});
  })
  
app.use('/', router)
app.listen(port, ()=> {
    console.log(`server is up on port ${port}`)
})

