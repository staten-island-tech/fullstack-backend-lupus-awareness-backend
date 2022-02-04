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
        req.body.user = req.oidc.user
        req.body.date = new Date()
        const newEvent = new Event(req.body)
        console.log(req.body)
        await newEvent.save()
        res.json(newEvent)
    } catch (error) {
        res.json(error)
    }
}