import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User, UserAttributes } from '../models/User'
import { Event } from '../models/Event'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { userJoi } from './validation_schema'

export const allEvents = async (req: Request, res: Response) => {
    try {
        let events = await Event.find()
        // events.forEach((el) => {
        //     let event: EventData = {
        //       user: el!.user,
        //       date: el!.date,
        //       hours: el!.hours,
        //       location: el!.location,
        //       description: el!.description,
        //       media: el!.media,
        //       numberInterested: el!.numberInterested,
        //       numberComments: el!.numberComments,
        //       slug: el!.slug
        //     } 
        //     console.log(event)
        //   //   res.json(event)
        // })
        res.json(events)
    } catch (error) {
        res.json(error)
    }
}

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

export const updateEvents = async (req: Request, res: Response) => {
    try {
        const event : any = await Event.findById(req.params.id)
        const updates: string[] = Object.keys(req.body)
        updates.forEach((e: string) => ( event![e] = req.body[e]))
        await event.save()
        res.json(updates)
    } catch (error) {
        res.json(error)
    }
}

export const deleteAllEvent = async (req: Request, res: Response) => {
    try {
   
        const event = await Event.deleteMany({role: 'viewer'})
        res.json(`${event} deleted`)
    } catch (error) {
        console.log(error)
    }
}