import { Request, Response, NextFunction } from 'express'
import { stringify } from 'querystring'
import jwksRsa from 'jwks-rsa'
import jwt from 'express-jwt'
import jwtAuthz from 'express-jwt-authz'
import { isShorthandPropertyAssignment } from 'typescript'
import  { auth } from 'express-openid-connect'
import { requiresAuth } from 'express-openid-connect'
import { userModel } from '../models/User'
const User = userModel



export const createUser = async (req: Request, res: Response) => {
    try {
        const authResponse = req.oidc.user 
        const newUser = new User(req.body)
        req.body.email = newUser.email
        await newUser.save()
         res.json(newUser)
         console.log(newUser)
    } catch (error) {
        res.json(error)
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        res.setHeader('Access-Control-Allow-Origin', "http://localhost:8081")
        const Users = await User.find()
        // let { token_type, access_token } = req.oidc.accessToken;
        res.json(Users)
        console.log(req.oidc.accessToken)
    } catch (error) {
        res.json(error)
    }
}

export const updateUsers = async (req: Request, res: Response) => {
    try {
        const user : any = await User.findOne({ email: req.oidc.user.email}).exec();
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
        res.json(`${user!.firstName} ${user!.lastName} was deleted from DB`)
    } catch (error) {
        console.log(error)
    }
}


export const getProfile = async (req: Request, res: Response) => {
    try {
       const user = await User.findOne({ email: req.oidc.user.email}).exec();
        // const user = await User.findById(id)
        res.send(req.oidc.accessToken)
        // res.send(user)
    } catch (error) {
        console.log(error)
    }
}


