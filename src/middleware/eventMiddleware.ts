import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User, UserAttributes } from '../models/User'
import { Event, CommentInterface } from '../models/Event'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

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

export const event = async (req: Request, res: Response) => {
    try {
        const event = await Event.findOne({ _id: req.params.id })
        res.json(event)
    } catch (error) {
        res.json(error)
    }
}




export const createComment = async (req: Request, res: Response) => {
    try {
        const event = await Event.findOne({ _id: req.params.id })
        // res.json(event)
        // if(!event){
        //     res.json("This event doesn't exist")
        const commentId = crypto.randomBytes(16).toString('hex')
        const comment: CommentInterface = {
            comment_id: commentId,
            user: event!.user,
            date: new Date,
            content: req.body.content,
            likes: [],
            replies: []
        }
        await Event.updateOne(
            {'_id': req.params.id},
            { $push: { comments: comment }}
        )
        res.json(event)
    } catch (error) {
        res.json(error)
    }
}

export const reply = async (req: Request, res: Response) => {
    try {
        const commentId = req.params.comment_id
        const eventId = req.params.event_id
        console.log(commentId)

        const event = await Event.findOne({ _id: eventId})

        const replyId = crypto.randomBytes(16).toString('hex')
        const reply: CommentInterface = {
            comment_id: replyId,
            user: event!.user,
            date: new Date,
            content: req.body.content,
            likes: [],
            replies: []
        }

        await Event.findOneAndUpdate(
            {'_id': eventId,"comments.comment_id": commentId},
            { $push: { "comments.$.replies": reply }}
        )
    //    if(!event){
    //        res.json('event not found')
    //    }

        // console.log(req.params)
        
    

        

        res.json(event)
    } catch (error) {
        res.json(error)
    }
}




