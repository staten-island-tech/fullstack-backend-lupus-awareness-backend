import { Request, Response, NextFunction } from 'express'
import {User, Role} from '../../models/User'
import { Event } from '../../models/Event'

export const createEvent = async(req: Request, res: Response, next: NextFunction) => {
    if(req.body.payload.role === Role.Student) {return res.json('Students cannot create events')}
    try {
        const event = new Event({
            user: req.body.payload,
            date: new Date(),
            location: req.body.location,
            description: req.body.description,
            media: req.body.media
            });
        await event.save();
        await User.findOneAndUpdate({ _id: req.body.payload._id },
        {$push: {events: event._id}}
        );
        res.json(event)
    } catch (error) {
        res.json(error)
    }
}
