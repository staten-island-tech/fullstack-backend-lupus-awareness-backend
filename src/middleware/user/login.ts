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
        if (!existingUser) { return res.status(400).json('There is no user registered under this email. Meant to register?')}
        const validPassword = bcrypt.compareSync(password, existingUser!.password)
        if (!validPassword) { return res.status(400).json('Invalid Password')}
        const payload: UserAttributes = {
            _id: existingUser!._id,
            firstName: existingUser!.firstName,
            lastName: existingUser!.lastName,
            role: existingUser!.role,
            avatar: existingUser!.avatar
        }
        const userToken = jwt.sign(payload, process.env.PRIVATEKEY as string)
        res.cookie('auth-token', userToken, {
            expires: new Date(new Date().getTime() + 60 * 60 * 24 * 7 * 1000),
            secure: true,
            sameSite: 'none',
            httpOnly: true
        }).json('Successfully logged in.')
    } catch (error) {
        res.status(400).json(error)
    }
}

