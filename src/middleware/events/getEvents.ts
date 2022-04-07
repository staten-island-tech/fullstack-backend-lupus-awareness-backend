import { Request, Response, NextFunction } from 'express'
import {User} from '../../models/User'
import { Event } from '../../models/Event'

export const getEvents = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const user: any = await User.findById(req.body.payload._id)
        const userEvents = await Event.find({
            '_id': {
                $in: user.events
            }
        })
        res.send(userEvents)
    } catch (error) {
        res.json(error)
    }
}
