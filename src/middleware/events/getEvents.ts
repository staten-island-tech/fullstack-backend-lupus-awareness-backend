import { Request, Response, NextFunction } from 'express'
import {User, Role} from '../../models/User'
import { Event } from '../../models/Event'

export const getEvents = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const user: any = await User.findById(req.body.payload._id)
        const userEvents = await Event.find({
            '_id': {
                $in: user.events
            }
        })
        res.json(userEvents)
    } catch (error) {
        res.status(400).json(error)
    }
}
