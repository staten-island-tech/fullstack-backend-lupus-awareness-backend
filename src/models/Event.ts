import mongoose, { Schema, model, connect } from 'mongoose'
import {UserAttributes, UserInterface, userSchema} from './User'
import { CommentInterface } from './Comment'
import jwt from 'jsonwebtoken'
const privateKey = process.env.PRIVATEKEY

export interface EventData {
    user: UserAttributes,
    name: String,
    start: Date,
    end: Date,
    hours?: number,
    location:string,
    description: string,
    media: [],
    tags: String[]
    numberInterested: number,
    numberComments: number,
    slug?: string
}

interface eventInterface extends EventData {
    interestedUsers: UserAttributes[],
    comments: CommentInterface[],
}

const eventSchema = new Schema({
    user: {type: {}, required: false},
    name: {type: String, required: true},
    start: {type: Date, required: true},
    end: {type: Date, required: true},
    hours: {type: Number},
    location: {type: String, required: true},
    description: {type: String, required: true},
    media: {type: [], required: true},
    tags: {type: [], required: true},
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

eventSchema.virtual("interested", {
  ref: "Interested",
  localField: "_id",
  foreignField: "event"
});

export {Event}