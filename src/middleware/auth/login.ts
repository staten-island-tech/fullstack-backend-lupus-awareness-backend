import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User, UserAttributes, UserInterface } from '../../models/User'
import bcrypt from 'bcryptjs'
import {userJoi} from '../../middleware/validation_schema'
import dotenv from 'dotenv'
dotenv.config()


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
        const userToken = jwt.sign(payload, process.env.PRIVATEKEY as string)
        res.header('auth-token', userToken).send(userToken)
    } catch (error) {
        res.json(error)
    }
}

