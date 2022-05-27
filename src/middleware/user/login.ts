import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User, UserAttributes, UserInterface } from '../../models/User'
import bcrypt from 'bcryptjs'
import {userJoi} from '../validation_schema'
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
            _id: existingUser!._id,
            firstName: existingUser!.firstName,
            lastName: existingUser!.lastName,
            role: existingUser!.role,
            avatar: existingUser!.avatar
        }
        const userToken = jwt.sign(payload, process.env.PRIVATEKEY as string)
        res.cookie('auth-token', userToken, {
            expires: new Date(new Date().getTime() + 60 * 60 * 24 * 1000),
            secure: true,
            sameSite: 'none',
            httpOnly: true
        }).send()
    } catch (error) {
        res.json(error)
    }
}

