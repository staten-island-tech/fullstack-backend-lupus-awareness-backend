import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User, UserAttributes } from '../models/User'
import { Event } from '../models/Event'
import bcrypt from 'bcryptjs'

export const createEvent = async(req: Request, res: Response, next: NextFunction) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        console.log(user)
        const event = new Event({
            user: user,
            date: new Date(),
            location: req.body.location,
            description: req.body.description
            });
        console.log(event)
        await event.save();
        res.json(event)
    } catch (error) {
        res.json(error)
    }
}
