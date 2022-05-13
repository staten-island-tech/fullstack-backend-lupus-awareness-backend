import { object } from 'joi'
import mongoose, { Schema, model, connect } from 'mongoose'
import {UserAttributes, UserInterface, userSchema} from './User'

interface CommentInterface {
    event_id: string,
    user: UserAttributes,
    date: Date,
    content: string,
    likes: UserAttributes[]
    replies: CommentInterface[]
}

const commentSchema = new Schema({
    user: {type: Object, trim: true, required: true},
    date: {type: Date, trim: true, required: true},
    content: {type: String, trim: true, required: true},
    likes: {type: [], trim: true, required: true},
    replies: {type: [], trim: true, required: true},
    event: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "Event"}
})

const Comment = mongoose.model<CommentInterface>('Comment', commentSchema)

export {Comment, CommentInterface}