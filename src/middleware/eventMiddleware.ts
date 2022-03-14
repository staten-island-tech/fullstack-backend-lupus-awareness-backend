import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User, UserAttributes } from '../models/User'
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
        console.log(event)
        await event.save();
        res.json(event)
    } catch (error) {
        res.json(error)
    }
}

export const getEvents = async (req: Request, res: Response) => {
    try {
        const Events = await Event.find()
        res.json(Events)
    } catch (error) {
        res.json(error)
    }
}
