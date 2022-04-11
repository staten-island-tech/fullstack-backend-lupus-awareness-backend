import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User, UserAttributes } from '../models/User'
import { Event, CommentInterface } from '../models/Event'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

// export const getEvents = async (req: Request, res: Response) => {
//     try {
//         const Events = await Event.find()
//         res.json(Events)
//     } catch (error) {
//         res.json(error)
//     }
// }

export const event = async (req: Request, res: Response) => {
    try {
        const event = await Event.findOne({ _id: req.params.id })

        if(!event){
            res.json("This event doesn't exist")
        }

        res.json(event)
    } catch (error) {
        res.json(error)
    }
}


export const deleteEvent = async (req: Request, res: Response) => {
    try {
   
        const event = await User.findByIdAndDelete(req.params.id)
        if(!event){
            res.status(404).send()
        }
        res.json(`${event!.firstName} ${event!.lastName} was deleted from DB`)
    } catch (error) {
        console.log(error)
    }
}