import mongoose, { Schema, model, connect } from 'mongoose'
import {UserAttributes, UserInterface, userSchema} from './User'
import jwt from 'jsonwebtoken'
const privateKey = process.env.PRIVATEKEY

interface UserCommentInterface {
    user?: UserAttributes,
    date?: Date,
    content: string,
    likes?: UserAttributes[]
    replies: UserCommentInterface[]
}
const commentSchema = new Schema({
    user: {type: {}, required: false},
    date: {type: Date, required: false},
    content: {type: String, required: true},
    likes: {type: Number, required:false},
    replies: {type: [], required: true},
})

interface replyCommentInterface {
    user?: UserAttributes,
    date?: Date,
    content: string,
    likes?: UserAttributes[]
}

const replySchema = new Schema({
    user: {type: {}, required: false},
    date: {type: Date, required: false},
    content: {type: String, required: true},
    likes: {type: Number, required:false},
})

interface eventInterface {
    user: UserAttributes,
    date: Date,
    hours?: number,
    location: string,
    description: string,
    media: string[],
    interestedUsers: UserAttributes[],
    comments: UserCommentInterface[],
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

const replyComment = mongoose.model<replyCommentInterface>('replyComment', replySchema)
const Comment = mongoose.model<UserCommentInterface>('Comment', commentSchema)
const Event = mongoose.model<eventInterface>('Event', eventSchema)

export {Event, Comment, replyComment}