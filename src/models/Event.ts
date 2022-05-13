import mongoose, { Schema, model, connect } from 'mongoose'
import {UserAttributes, UserInterface, userSchema} from './User'
import { CommentInterface } from './comments'
import jwt from 'jsonwebtoken'
const privateKey = process.env.PRIVATEKEY

export interface EventData {
    user: UserAttributes,
    date: Date,
    hours?: number,
    location: string,
    description: string,
    media: string[],
    numberInterested: number,
    numberComments: number,
    slug?: string
}

interface eventInterface extends EventData {
    interestedUsers: UserAttributes[],
    comments: CommentInterface[],
}

const eventSchema = new Schema({
    user: {type: {}, required: true},
    date: {type: Date, required: true},
    hours: {type: Number},
    location: {type: String, required: true},
    description: {type: String, required: true},
    media: {type: [], required: true},
    interestedUsers: {type: [], default: [], required: true},
    numberInterested: {type: Number, default: 0, required: true},
    numberComments: {type: Number, default: 0, required: true},
    slug: String
})

const Event = mongoose.model<eventInterface>('Event', eventSchema)

eventSchema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "event"
  });

export {Event}