import { Request, Response, NextFunction } from 'express'
import {User} from '../../models/User'
import { Event } from '../../models/Event'

export const createEvent = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const event = new Event({
            user: req.body.payload,
            date: new Date(),
            location: req.body.location,
            description: req.body.description,
            media: req.body.media
            });
        await event.save();
        let user = await User.findOne({ _id: req.body.payload._id });
        user!.events.push(event._id)
        res.json(event)
    } catch (error) {
        res.json(error)
    }
}
