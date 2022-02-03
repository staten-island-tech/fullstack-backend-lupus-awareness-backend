import mongoose, { Schema, model, connect } from 'mongoose'
import slugify from "slugify"


export interface User {
    name: string,
    email: string,
    password: string,
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
    password: {type: String, required: false},
    role: {type: String, required: false, },
    subscribers: {type:[], required: false},
    interestedEvents: {type:[], required: false},
    events: {type:[], required: false},
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

export {userModel}