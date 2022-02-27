import express from "express"
import { Request, Response, NextFunction } from 'express'
import { router } from './routes/index'
import jwt from 'express-jwt'
import jwksRsa from 'jwks-rsa'
import cors from 'cors'
import bodyParser from 'body-parser'
import './DB/mongoose' //ensures mongoose connects
import  { auth } from 'express-openid-connect'
import { requiresAuth } from 'express-openid-connect'
import { userModel } from "./models/User"
import { getUsers } from "./controllers/userController"

const port = process.env.PORT || 3000
const app = express();


const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

//enable cors
app.use(cors({
  origin:"*"
}))

// app.get('/', function (req, res, next) {

//   res.send(data)
// })
 
app.listen(8080, function () {
  console.log('CORS-enabled web server listening on port 3000')
})

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


app.use('/', router)
app.listen(port, ()=> {
    console.log(`server is up on port ${port}`)
})

  // req.isAuthenticated is provided from the auth router
  

  


  
