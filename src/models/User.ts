import mongoose, { Schema, model, connect } from 'mongoose'
import jwt from 'jsonwebtoken'
const privateKey = process.env.PRIVATEKEY

// enum Role {
//     Viewer = 'viewer',
//     Uploader = 'uploader',
//     Admin = 'admin'
// }

export interface UserInterface {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    // role: Role,
    role: String,
    subscribers: UserInterface[],
    interestedEvents: UserInterface[]
    // events: Event[],
    avatar?: string,
    slug?: string
}

const userSchema = new Schema({
    firstName: {type: String, trim: true, required: true},
    lastName: {type: String, trim: true, required: true},
    email: { type: String, required: true },
    password: { type: String, required: true},
    // role: {type: Role, default: Role.Viewer, required: true},
    role: {type: String, default: 'viewer'},
    subscribers: {type:[], default: [], required: true},
    interestedEvents: {type:[], default: [], required: true},
    events: {type:[], default: [], required: true},
    avatar: {type: String, default: null},
    slug: String
})

const User = mongoose.model<UserInterface>('User', userSchema)

export {User, userSchema}