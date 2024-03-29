import { Request, Response, NextFunction } from 'express'
import { Event } from '../../models/Event'
import { User } from '../../models/User'
import { CommentInterface, Comment } from '../../models/Comment'
import crypto from 'crypto'
import { error } from 'console'

export const createComment = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ _id: req.body.payload._id })
        const userId = user!._id
        const event = await Event.findOne({ _id: req.params.id})
        let initial = event!.numberComments
        let commentNumber = initial + 1
        // console.log(event?.numberComments)
        // const event = await Event.findOne({ _id: req.params.id })
        
        // if(!event){
        //     res.json("This event doesn't exist")
        // }

        const comment = new Comment({
            user: userId,
            event: req.params.id,
            date: new Date(),
            content: req.body.content,
            likes: [],
            replies: [],
        })
        await comment.save()

        // const commentId = crypto.randomBytes(16).toString('hex')
        // const comment: CommentInterface = {
        //     comment_id: commentId,
        //     user: event!.user,
        //     date: new Date,
        //     content: req.body.content,
        //     likes: [],
        //     replies: []
        // }
        await Event.updateOne(
            {'_id': req.params.id},
            { $set: { numberComments : commentNumber }}
        )

        console.log(commentNumber)
        res.json(comment)
        
    } catch (error) {
        res.status(400).json(error)
    }
}


export const reply = async (req: Request, res: Response) => {
    try {
        const commentId = req.params.comment_id
        const eventId = req.params.event_id
        console.log(commentId)

        const comment = await Comment.findOne({ _id: commentId})
        // res.json(comment!.replies)
        // const event = await Event.findOne({ _id: eventId})

        // if(!event){
        //     res.json("This event doesn't exist")
        // }

        const reply = new Comment({
            user: req.body.payload._id,
            event: req.params.id,
            date: new Date(),
            content: req.body.content,
            likes: [],
            replies: [],
        })
        
        comment!.replies.push(reply)

        reply.save()
        comment?.save()

        res.json(comment)
        


        // const replyId = crypto.randomBytes(16).toString('hex')
        // // const reply: CommentInterface = {
        // //     comment_id: replyId,
        // //     user: event!.user,
        // //     date: new Date,
        // //     content: req.body.content,
        // //     likes: [],
        // //     replies: []
        // // }

        // await Event.findOneAndUpdate(
        //     {'_id': eventId,"comments.comment_id": commentId},
        //     { $push: { "comments.$.replies": comment }}
        // )
        res.json(event)
    } catch (error) {
        res.json(error)
    }
}


export const allComments = async (req: Request, res: Response) => {
    try {
        const comments = await Comment.find()
        res.json(comments)
    } catch (error) {
        res.status(400).json(error)
    }
}


export const deleteComment = async (req: Request, res: Response) => {
    try {
       const comments = await Comment.find({_id: '623678cbcb8c883ac7f1dee9'})
        res.json(`${comments} deleted`)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const findComment = async (req: Request, res: Response) => {
    try {
        console.log(req.params.id)
        const comment = await Comment.findOne({ _id: req.params.id })
        if(!comment){
            res.json("This comment doesn't exist")
        }

        res.json(comment)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const populateComments = async (req: Request, res: Response) => {
    try {
        const event = await Event.findOne({ _id: req.params.id})
        .populate('comments')
        .exec(function (err, event) {
            if (err) {
                res.json(err)
            };
            console.log('succesfful')
            res.json(event!.comments)
        })
    } catch (error) {
        res.status(400).json(error)
    }
}





