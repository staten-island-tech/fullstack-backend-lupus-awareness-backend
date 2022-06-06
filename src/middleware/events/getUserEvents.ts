import { Request, Response, NextFunction } from 'express'
import {User, Role} from '../../models/User'
import { Event } from '../../models/Event'

export const getUserEvents = async(req: Request, res: Response, next: NextFunction) => {
    const params = req.params.id
    try {
        const user: any = await User.findById(params)
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
