import mongoose, { Schema, model, connect } from 'mongoose'
import slugify from "slugify"

export interface User {
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    subscribers: [],
    interestedEvents: []
    events: [],
    avatar?: string,
    slug?: string
}

const userSchema = new Schema<User>({
    firstName: {type: String, trim: true, required: true},
    lastName: {type: String, trim: true, required: true},
    email: {type: String, required: true},
    role: {type: String, required: true},
    subscribers: {type:[], default: [], required: true},
    interestedEvents: {type:[], default: [], required: true},
    events: {type:[], default: [], required: true},
    avatar: {type: String, default: null},
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

export {userModel, userSchema}