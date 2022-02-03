import mongoose, { Schema, model, connect } from 'mongoose'
import slugify from "slugify"
import {User, userModel, userSchema} from './User'

interface UserComment {
    user: User,
    date: Date,
    content: string,
    replies: UserComment[]
}

interface Event {
    user: User,
    date: Date,
    hours?: number,
    location: string,
    description: string,
    interestedUsers: User[],
    comments: UserComment[],
    slug?: string
}

const eventSchema = new Schema<Event>({
    user: {type: userSchema, required: true},
    date: {type: Date, required: true},
    hours: {type: Number},
    location: {type: String, required: true},
    description: {type: String, required: true},
    interestedUsers: {type: [], required: true},
    comments: {type: [], required: true},
    slug: String
})

const eventModel = model<Event>('Event', eventSchema)

export {eventModel}