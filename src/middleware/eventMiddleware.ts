import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User, UserAttributes } from '../models/User'
import { Event, CommentInterface } from '../models/Event'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { userJoi } from './validation_schema'

export const allEvents = async (req: Request, res: Response) => {
    try {
        const Events = await Event.find()
        res.json(Events)
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

export const interested = async (req: Request, res: Response) => {
    try {
        const payload = req.body.payload
        const event = await Event.findOne( {_id: req.params.id})
        const user = await User.findOne({ _id: payload._id})

        // if(user?.interestedEvents._id = event._id){
        //     res.json('You are already interested in this event')
        //     return
        // }

        res.json(user)

        // await Event.findOneAndUpdate(
        //     {_id: req.params.id},
        //     { $push: { interestedUsers: user}}
        // )

        // await User.findOneAndUpdate(
        //     {_id: payload._id},
        //     { $push: { interestedEvents: event}}
        // )
        
        
    } catch (error) {
        console.log(error)
    }
}