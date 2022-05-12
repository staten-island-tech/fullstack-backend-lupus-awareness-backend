import { Request, Response, NextFunction } from 'express'
import { Event } from '../../models/Event'
import { CommentInterface, Comment } from '../../models/comments'
import crypto from 'crypto'

export const createComment = async (req: Request, res: Response) => {
    try {
        const event = await Event.findOne({ _id: req.params.id })
        
        if(!event){
            res.json("This event doesn't exist")
        }
        
        // const commentId = crypto.randomBytes(16).toString('hex')
        // const comment: CommentInterface = {
        //     comment_id: commentId,
        //     user: event!.user,
        //     date: new Date,
        //     content: req.body.content,
        //     likes: [],
        //     replies: []
        // }
        const comment = new Comment({

        })
        // await Event.updateOne(
        //     {'_id': req.params.id},
        //     { $push: { comments: comment }}
        // )
        res.json(comment)
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

        if(!event){
            res.json("This event doesn't exist")
        }

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
        res.json(event)
    } catch (error) {
        res.json(error)
    }
}
