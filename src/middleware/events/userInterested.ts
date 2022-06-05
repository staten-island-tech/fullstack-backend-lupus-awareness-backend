import { Request, Response, NextFunction } from 'express'
import { Event } from '../../models/Event'
import { User } from '../../models/User'
import { interestedInterface, Interested} from '../../models/Interested'

export const showInterest = async (req: Request, res: Response) => {
    try {

        // if(doesExist)

        const user = await User.findOne({ _id: req.body.payload._id })
        const userId = user!._id

        // const event = await Event.findOne({ _id: req.params.id})
        // .populate('interested')
        // .exec(function (err, event) {
        //     if (err) {
        //         res.json(err)
        //     };
        //     console.log('succesfful')
        //     console.log(event!.interested)
        // })

        // console.log(event)

        // const doesExist = await Interested.findOne({ event: req.params.id, user: userId });
        // const checkExist = (currentValue: any) => currentValue.user === doesExist?._id
        // console.log(event.every(checkExist))
        // if(event.includes(userId)){
        //     console.log("true")
        // }else{
        //     console.log("not true")
        // }

        // let doesExist = await Interested.findOne({ event: req.params.id, user: userId });
        // console.log(doesExist)

        const event1 = await Event.findOne({ _id: req.params.id})
        let initial = event1!.numberInterested
        let interestNumber = initial + 1
        // console.log(event?.numberComments)
        // const event = await Event.findOne({ _id: req.params.id })
        
        // if(!event){
        //     res.json("This event doesn't exist")
        // }

        const interest = new Interested({
            user: userId,
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
        await Event.updateOne(
            {'_id': req.params.id},
            { $set: { numberInterested : interestNumber }}
        )

        await User.findOneAndUpdate(
            {_id: req.body.payload._id},
            { $push: { interestedEvents: req.params.id}}
        )

        console.log(interestNumber)
        res.json(interest)
        
    } catch (error) {
        res.status(400).json(error)
    }
}


export const allInterested = async (req: Request, res: Response) => {
    try {
        const interested = await Interested.find()
        res.json(interested)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const populateUser = async (req: Request, res: Response) => {
    try {
        const event = await Event.findOne({ _id: req.params.id})
        .populate('interested')
        .exec(function (err, event) {
            if (err) {
                res.json(err)
            };
            console.log('succesfful')
            res.json(event!.interested)
        })
    } catch (error) {
        res.status(400).json(error)
    }
}




