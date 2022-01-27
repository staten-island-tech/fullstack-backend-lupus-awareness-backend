import { Request, Response, NextFunction } from 'express'
import {eventModel} from '../models/Event'
const Event = eventModel

export const createEvent = async (req: Request, res: Response) => {
    try {
        console.log(req.oidc.user)
    } catch (error) {
        res.json(error)
    }
}