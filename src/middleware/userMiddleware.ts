import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User, UserAttributes, UserInterface } from '../models/User'
import {Event} from '../models/Event'
import bcrypt from 'bcryptjs'
import {userJoi} from '../middleware/validation_schema'
import dotenv from 'dotenv'
dotenv.config()

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
        const user : any = await User.findById(req.params.id)
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
        let user = await User.findOne({ _id: req.body.payload._id });
        // res.json(user)
        console.log(req.body.payload)
        res.json(user)
        // console.log(req.body.payload.email)
    } catch (error) {
        console.log(error)
    }
}
 
export const deleteAllUser = async (req: Request, res: Response) => {
    try {
   
        const user = await User.deleteMany({role: 'viewer'})
        res.json(`${user} deleted`)
    } catch (error) {
        console.log(error)
    }
}

export const subscribe = async (req: Request, res: Response) => {
    try {
        let user = User.findOne({_id: req.body.payload.id})
        console.log(user)
    } catch (error) {
        console.log(error)
    }
}
