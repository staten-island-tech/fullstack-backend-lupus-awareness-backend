import mongoose, { Schema, model, connect } from 'mongoose'
import slugify from "slugify"
import {userModel} from './User'

export interface UserComment {
    user: typeof userModel,
    date: Date,
    content: string,
    replies: [UserComment]
}

interface Event {
    user: typeof userModel,
    date: Date,
    hours?: number,
    location: string,
    description: string,
    interestedUsers: [],
    comments: {
        commentDate: Date,
        content: string,
        replies: [UserComment]
    },
    slug?: string
}

const eventSchema = new Schema<Event>({
    user: {type: userModel, required: true},
    date: {type: Date, required: true},
    hours: {type: Number},
    location: {type: String, required: true},
    description: {type: String, required: true},
    interestedUsers: {type: [], required: true},
    slug: String
})

const eventModel = model<Event>('Event', eventSchema)

export {eventModel}