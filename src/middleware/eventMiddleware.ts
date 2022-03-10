import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/User'
import { Event } from '../models/Event'
import bcrypt from 'bcryptjs'

export const createEvent = async(req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body)
        let user = await User.findOne({ email: req.body.email });
        const event = new Event({
            user: user,
            date: new Date(),
            location: req.body.location,
            description: req.body.description
            });
        await event.save();
        res.json(event)
    } catch (error) {
        res.json(error)
    }
}
