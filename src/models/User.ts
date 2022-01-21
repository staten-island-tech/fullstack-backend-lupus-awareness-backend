import { truncate } from 'fs/promises'
import mongoose, { Schema, model, connect } from 'mongoose'
import slugify from "slugify"

export interface User {
    name: string,
    email: string,
    role: string,
    subscribers: [],
    interestedEvents: []
    events: [],
    avatar?: string,
    slug?: string
}

const userSchema = new Schema<User>({
    name: {type: String, trim: true, required: true},
    email: {type: String, required: true},
    role: {type: String, required: true},
    subscribers: {type:[], required: true},
    interestedEvents: {type:[], required: true},
    events: {type:[], required: true},
    avatar: String,
    slug: String
})

const userModel = model<User>('User', userSchema)

userSchema.pre('save', function (next) {
    if (!this.isModified('name')) {
        next()
        return
    }
    this.slug = slugify(this.name)
    next()
})

export {User}