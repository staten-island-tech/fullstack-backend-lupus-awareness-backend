import mongoose, { Schema, model, connect } from 'mongoose'
import {UserAttributes, UserInterface, userSchema} from './User'
import jwt from 'jsonwebtoken'
const privateKey = process.env.PRIVATEKEY

interface CommentInterface {
    comment_id: string,
    user: UserAttributes,
    date: Date,
    content: string,
    likes: UserAttributes[]
    replies: CommentInterface[]
}

export interface EventData {
    user: UserAttributes,
    date: Date,
    hours?: number,
    location: string,
    description: string,
    media: string[],
    numberInterested: number,
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
    comments: {type: [], default: [], required: true},
    slug: String
})

const Event = mongoose.model<eventInterface>('Event', eventSchema)

export {Event, CommentInterface}