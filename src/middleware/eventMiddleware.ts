import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User, UserAttributes } from '../models/User'
import { Event, Comment, replyComment } from '../models/Event'
import bcrypt from 'bcryptjs'

export const createEvent = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const event = new Event({
            user: req.body.payload,
            date: new Date(),
            location: req.body.location,
            description: req.body.description,
            media: req.body.media
            });
        console.log(event)
        await event.save();
        res.json(event)
    } catch (error) {
        res.json(error)
    }
}

export const getEvents = async (req: Request, res: Response) => {
    try {
        const Events = await Event.find()
        res.json(Events)
    } catch (error) {
        res.json(error)
    }
}


export const createComment = async (req: Request, res: Response) => {
    try {
        const event = await Event.findOne({ _id: req.params.id })
        // res.json(event)
        // if(event!){
        //     res.json("This event doesn't exist")
        // }
        const comment = new Comment({
            content: req.body.content
        })
        res.json(comment)
        let commentInfo = await comment.save()
        console.log(commentInfo)
        await Event.updateOne(
            {_id: req.params.id},
            { $push: { comments: commentInfo }}
        )
        console.log(event)
    } catch (error) {
        res.json(error)
    }
}

export const reply = async (req: Request, res: Response) => {
    try {
        const event = await Event.findOne({ event_id: req.params.id })
        const selectedComment = await Comment.findOne({ _id:req.params.id })
        // res.json(event)
        // if(event!){
        //     res.json("This event doesn't exist")
        // }
        res.json(selectedComment)
        const comment = new replyComment({
            content: req.body.content
        })
        console.log(comment)
        let commentInfo = await comment.save()
        await Comment.updateOne(
            {_id: req.params.id},
            { $push: { replies: commentInfo }}
        )
        console.log(event)
    } catch (error) {
        res.json(error)
    }
}




