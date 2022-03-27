import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User, UserAttributes } from '../models/User'
import { Event, Comment } from '../models/Event'
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
            {'_id': req.params.id},
            { $push: { comments: commentInfo }}
        )
        console.log(event)
    } catch (error) {
        res.json(error)
    }
}

export const reply = async (req: Request, res: Response) => {
    try {
        const commentId = req.params.comment_id
        const eventId = req.params.event_id
        console.log(commentId)

        const event = await Event.findOne({ 
            // 'comments.content': "home",
            // 'comments._id': '623c9512b05b082ee54369d0'
            // 'comments.replies': []
            "comments._id": "6240ccaea107f4ad9fc79e08"
        })

    //    if(!event){
    //        res.json('event not found')
    //    }

        // console.log(req.params)
        
        const comment = new Comment({
            content: req.body.content,
        })

        let commentInfo = await comment.save()
        console.log(commentInfo)
    

        
        await Event.findOneAndUpdate(
            {'_id': eventId,'comments._id': req.params.comment_id},
            { $push: { "comments.$.replies": commentInfo }}
        )

        res.json(event)
    } catch (error) {
        res.json(error)
    }
}




