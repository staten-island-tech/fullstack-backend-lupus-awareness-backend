import express from "express"
import { Request, Response, NextFunction } from 'express'
import { router } from './routes/index'
import jwt from 'express-jwt'
import jwksRsa from 'jwks-rsa'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import passport from 'passport'
import ('./config/passport')
import './DB/mongoose' //ensures mongoose connects
import  { auth } from 'express-openid-connect'
import { requiresAuth } from 'express-openid-connect'

const port = process.env.PORT || 3000
const app = express();


const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:3000',
  clientID: 'W27qMzcn1MeFLgZFreqtfjYLppDKeUcK',
  issuerBaseURL: 'https://lupusawareness.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

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

app.use(cookieParser('secretcode'))
app.use(passport.initialize())
app.use(passport.session())

app.use('/', router)
app.listen(port, ()=> {
    console.log(`server is up on port ${port}`)
})

  // req.isAuthenticated is provided from the auth router
  
  app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
  });

// app.get('/', (req: Request, res: Response) => {
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
//   res.setHeader("Access-Control-Allow_-Origin", 'http://localhost:8080')
//   res.send(app)
// })