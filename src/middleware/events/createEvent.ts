import { Request, Response, NextFunction } from 'express'
import {User, Role} from '../../models/User'
import { Event } from '../../models/Event'

export const createEvent = async(req: Request, res: Response, next: NextFunction) => {
    if(req.body.payload.role === Role.Student) {return res.status(400).json('Students cannot create events')}
    console.log(req.body)
    try {
        const event = new Event({
            user: req.body.payload,
            name: req.body.name,
            hours: req.body.hours,
            start: req.body.start,
            end: req.body.end,
            location: req.body.location,
            description: req.body.description,
            media: req.body.media,
            tags: req.body.tags
            });
        await event.save();
        await User.findOneAndUpdate({ _id: req.body.payload._id },
        {$push: {events: event._id}}
        );
        res.json(event)
    } catch (error) {
        res.status(400).send(error)
    }
}
