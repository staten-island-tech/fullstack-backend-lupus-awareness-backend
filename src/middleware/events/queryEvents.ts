import { Request, Response, NextFunction } from 'express'
import { Event } from '../../models/Event'

export const queryEvents = async(req: Request, res: Response, next: NextFunction) => {
    try {
        let events = await Event.find()
        res.json(events)
    } catch (error) {
        res.status(400).json(error)
    }
}
