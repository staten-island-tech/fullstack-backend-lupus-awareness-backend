import { Request, Response, NextFunction } from 'express'
import { stringify } from 'querystring'
import jwksRsa from 'jwks-rsa'
import jwt from 'express-jwt'
import jwtAuthz from 'express-jwt-authz'
import { isShorthandPropertyAssignment } from 'typescript'
import { userModel } from '../models/User'
const User = userModel



export const createUser = async (req: Request, res: Response) => {
    try {
        const user = new User(req.body)
        await user.save()
        res.json(user)
       
        
    } catch (error) {
        res.json(error)
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        const Users = await User.find()
        res.json(Users)
    } catch (error) {
        res.json(error)
    }
}

export const updateUsers = async (req: Request, res: Response) => {
    try {
        const user: any = await User.findById(req.params.id)
        const updates: string[] = Object.keys(req.body)
        updates.forEach((e: string) => ( user![e] = req.body[e]))
        await user.save()
        res.json(updates)
    } catch (error) {
        res.json(error)
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
   
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            res.status(404).send()
        }
        res.json(`${user!.name} was deleted from DB`)
    } catch (error) {
        console.log(error)
    }
}

export const checkJwt = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // res.status(200).send({message: "This is the POST before the final/timesheets endpoint"});
         jwt({
            secret: jwksRsa.expressJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: 'https://lupusawareness.us.auth0.com/.well-known/jwks.json'
          }),
          audience: 'https://test-api-endpoint',
          issuer: 'https://lupusawareness.us.auth0.com/',
          algorithms: ['RS256']
      });  
       next()
    } catch (error) {
        console.log(error)
    }
}

export const testing = async (req: Request, res: Response) => {
    try {
        const timesheet = req.body
        res.status(200).send({message: "This is the POST /timesheets endpoint"});
    } catch (error) {
        console.log(error)
    }
}

