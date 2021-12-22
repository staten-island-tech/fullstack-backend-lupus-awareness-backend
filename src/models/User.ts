import mongoose, { Schema, model, connect } from 'mongoose'
import slugify from "slugify"

interface User {
    name: string,
    email: string,
    avatar?: string,
    slug?: string
}

const userSchema = new Schema<User>({
    name: {type: String, trim: true, required: true},
    email: {type: String, required: true},
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