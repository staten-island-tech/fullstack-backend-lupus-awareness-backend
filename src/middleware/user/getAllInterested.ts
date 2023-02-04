import { Request, Response, NextFunction } from 'express'
import { Interested } from '../../models/Interested'

export const getAllInterested = async(req: Request, res: Response, next: NextFunction) => {
    try {
        let events = await Interested.find(userID: req.body.payload._id)
        res.json(events)
    } catch (error) {
        res.status(400).json(error)
    }
}
