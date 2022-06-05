import { object, string } from 'joi'
import mongoose, { Schema, model, connect } from 'mongoose'
import {UserAttributes, UserInterface, userSchema} from './User'

interface interestedInterface {
    userID: String,
    date: Date,
}

const interestedSchema = new Schema({
    userID:  {type: String, trim: true, required: true},
    date: {type: Date, trim: true, required: true},
    event: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "Event"}
})

const Interested = mongoose.model<interestedInterface>('Interested', interestedSchema)

export {Interested, interestedInterface}