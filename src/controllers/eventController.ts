import { Request, Response, NextFunction } from 'express'
import  { auth } from 'express-openid-connect'
import { requiresAuth } from 'express-openid-connect'
import { eventModel } from '../models/Event'
const Event = eventModel
// import { stringify } from 'querystring'
// import jwksRsa from 'jwks-rsa'
// import jwt from 'express-jwt'
// import jwtAuthz from 'express-jwt-authz'
// import { isShorthandPropertyAssignment } from 'typescript'

export const createEvent = async (req: Request, res: Response) => {
    try {
        const user = req.oidc.user
        const newEvent = new Event(req.body)
        req.body.user = user
        console.log(req.body)
        await newEvent.save()
        res.json(newEvent)
    } catch (error) {
        res.json(error)
    }
}