import mongoose, { Schema, model, connect } from 'mongoose'
import slugify from "slugify"
import {userModel} from './User'

interface Event {
    user: typeof userModel,
    date: Date,
    hours: number,
    location: string,
    description: string,
    slug?: string
}

const eventSchema = new Schema<Event>({
    user: {type: userModel, required: true},
    date: {type: Date, required: true},
    hours: {type: Number, required: true},
    location: {type: String, required: true},
    description: {type: String, required: true},
    slug: String
})

const eventModel = model<Event>('Event', eventSchema)

export {eventModel}