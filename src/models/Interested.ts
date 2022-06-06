import mongoose, { Schema, model, connect, ObjectId } from 'mongoose'
import {UserAttributes, UserInterface, userSchema} from './User'

interface interestedInterface {
    userID: ObjectId,
    date: Date,
    event: ObjectId
}

const interestedSchema = new Schema({
    userID:  {type: mongoose.Schema.Types.ObjectId, trim: true, required: true},
    date: {type: Date, trim: true, required: true},
    event: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "Event"}
})

const Interested = mongoose.model<interestedInterface>('Interested', interestedSchema)

export {Interested, interestedInterface}