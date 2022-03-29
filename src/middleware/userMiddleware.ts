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

export const createUser = async (req: Request, res: Response) => {
    try {
        //find an existing user
        let doesExist = await User.findOne({ email: req.body.email });
        if (doesExist) return res.status(400).send("User already registered.");

        const user = new User(req.body)
        user.password = await bcrypt.hash(req.body.password, 10);
        await user.save();
    res.json(user)
    } catch (error) {
        console.log(error)
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            res.json('email not registered')
        }
        console.log(existingUser)
        const validPassword = bcrypt.compareSync(password, existingUser!.password)
        console.log(validPassword)
        if (!validPassword) {
            res.json('not valid')
            return
        }
        console.log('valid')
        const payload: UserAttributes = {
            firstName: existingUser!.firstName,
            lastName: existingUser!.lastName,
            role: existingUser!.role,
            subscribers: existingUser!.subscribers,
            interestedEvents: existingUser!.interestedEvents,
            events: existingUser!.events,
            avatar: existingUser!.avatar
        }
        const userToken = jwt.sign(payload, `${process.env.PRIVATEKEY}` as string)
        res.header('auth-token', userToken).send(userToken)
    } catch (error) {
        console.log(error)
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
        res.json(req.body.payload)
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
