import { Request, Response, NextFunction } from 'express'
import { stringify } from 'querystring'
import jwksRsa from 'jwks-rsa'
import jwt from 'express-jwt'
import jwtAuthz from 'express-jwt-authz'
import { isShorthandPropertyAssignment } from 'typescript'
import  { auth } from 'express-openid-connect'
import { requiresAuth } from 'express-openid-connect'
import { userModel } from '../models/User'
import passport from 'passport'
import bcrypt from 'bcryptjs'
const User = userModel



export const createUser = async (req: Request, res: Response) => {
    try {
        const newUser = new User(req.body)
        bcrypt.genSalt(10, (err, salt) =>
              bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err
              newUser.password = hash
              newUser.save()
        }))
        
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
        res.json(`${user!.firstName} ${user!.lastName} was deleted from DB`)
    } catch (error) {
        console.log(error)
    }
}

export const test = async (req: Request, res: Response) => {
    try {
        const authResponse = req.oidc.user
        console.log(authResponse)
    } catch (error) {
        console.log(error)
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        passport.authenticate('local', {
            successRedirect: '/dashboard',
            failureRedirect: '/login'
        })
    } catch (error) {
        console.log(error)
    }
}
