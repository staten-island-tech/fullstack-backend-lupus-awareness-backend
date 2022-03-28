import mongoose, { Schema, model, connect } from 'mongoose'
import {UserAttributes, UserInterface, userSchema} from './User'
import jwt from 'jsonwebtoken'
const privateKey = process.env.PRIVATEKEY

interface CommentInterface {
    user: UserAttributes,
    date: Date,
    content: string,
    likes: UserAttributes[]
    replies: CommentInterface[]
}


interface eventInterface {
    user: UserAttributes,
    date: Date,
    hours?: number,
    location: string,
    description: string,
    media: string[],
    interestedUsers: UserAttributes[],
    comments: CommentInterface[],
    slug?: string
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