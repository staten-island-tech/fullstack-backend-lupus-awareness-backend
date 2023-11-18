import { Request, Response, NextFunction } from 'express'
import { number } from 'joi'
import { Event } from '../../models/Event'

export const queryEvents = async(req: Request, res: Response, next: NextFunction) => {
    try {
        let pageNumber: number = req.query.page
        let events = await Event.find().skip((pageNumber- 1) * 5).limit(5)
        res.json(events)
    } catch (error) {
        res.status(400).json(error)
    }
}

