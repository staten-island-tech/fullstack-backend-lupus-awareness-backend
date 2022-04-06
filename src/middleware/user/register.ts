import { Request, Response, NextFunction } from 'express'
import { User, UserAttributes, UserInterface } from '../../models/User'
import bcrypt from 'bcryptjs'
import {userJoi} from '../validation_schema'
import dotenv from 'dotenv'
dotenv.config()

export const register = async (req: Request, res: Response) => {
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