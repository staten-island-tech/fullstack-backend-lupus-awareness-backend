import { Request, Response, NextFunction } from 'express'
import { Event } from '../../models/Event'
import { User } from '../../models/User'
import { interestedInterface, Interested} from '../../models/Interested'

export const showInterest = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ _id: req.body.payload._id })
        const userId = user!._id
        const event = await Event.findOne({ _id: req.params.id})
        let initial = event!.numberInterested
        let interestNumber = initial + 1
        // console.log(event?.numberComments)
        // const event = await Event.findOne({ _id: req.params.id })
        
        // if(!event){
        //     res.json("This event doesn't exist")
        // }

        const interest = new Interested({
            user: user,
            event: req.params.id,
            date: new Date(),
        })
        await interest.save()

        // const commentId = crypto.randomBytes(16).toString('hex')
        // const comment: CommentInterface = {
        //     comment_id: commentId,
        //     user: event!.user,
        //     date: new Date,
        //     content: req.body.content,
        //     likes: [],
        //     replies: []
        // }
        // await Event.updateOne(
        //     {'_id': req.params.id},
        //     { $set: { numberComments : commentNumber }}
        // )

        // console.log(commentNumber)
        res.json(interest)
        
    } catch (error) {
        res.json(error)
    }
}