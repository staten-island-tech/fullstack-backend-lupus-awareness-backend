import mongoose, { Schema, model, connect } from 'mongoose'
import {UserInterface, userSchema} from './User'
import jwt from 'jsonwebtoken'
const privateKey = process.env.PRIVATEKEY

interface UserCommentInterface {
    user: UserInterface,
    date: Date,
    content: string,
    replies: UserCommentInterface[]
}

interface eventInterface {
    user: UserInterface,
    date: Date,
    hours?: number,
    location: string,
    description: string,
    interestedUsers: UserInterface[],
    comments: UserCommentInterface[],
    slug?: string
}

const eventSchema = new Schema({
    user: {type: userSchema, required: true},
    date: {type: Date, required: true},
    hours: {type: Number},
    location: {type: String, required: true},
    description: {type: String, required: true},
    interestedUsers: {type: [], default: [], required: true},
    comments: {type: [], default: [], required: true},
    slug: String
})

const Event = mongoose.model<eventInterface>('Event', eventSchema)

export {Event}