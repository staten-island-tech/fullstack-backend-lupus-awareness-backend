import { object } from 'joi'
import mongoose, { Schema, model, connect } from 'mongoose'
import {UserAttributes, UserInterface, userSchema} from './User'

interface interestedInterface {
    user: UserAttributes,
    date: Date,
}

const interestedSchema = new Schema({
    user:  {type: Object, trim: true, required: true},
    date: {type: Date, trim: true, required: true},
    event: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "Event"}
})

const Interested = mongoose.model<interestedInterface>('Interested', interestedSchema)

export {Interested, interestedInterface}