import { Request, Response, NextFunction } from 'express'
import { Event } from '../../models/Event'
import { User } from '../../models/User'
import { interestedInterface, Interested} from '../../models/Interested'

export const showInterest = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ _id: req.body.payload._id })
        const userId = user!._id
        const event1 = await Event.findOne({ _id: req.params.id})
        let initial = event1!.numberInterested
        let interestNumber = initial + 1
        const interest = new Interested({
            userID: userId,
            event: req.params.id,
            date: new Date(),
        })
        await interest.save()
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




