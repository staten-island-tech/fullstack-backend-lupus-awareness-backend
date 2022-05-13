import mongoose, { Schema, model, connect } from 'mongoose'
import jwt from 'jsonwebtoken'
const privateKey = process.env.PRIVATEKEY

enum Role {
    Viewer = 'viewer',
    Uploader = 'uploader',
    Admin = 'admin'
}
export interface UserData {
    firstName: string,
    lastName: string,
    role: Role,
    
    avatar: string,
    slug?: string
}

export interface UserAttributes extends UserData{
    _id: mongoose.Types.ObjectId
}

export interface UserInterface extends UserData {
    email: string,
    password: string,
    subscribers: UserInterface[],
    subscribed: UserInterface[],
    interestedEvents: mongoose.Types.ObjectId[]
    events: mongoose.Types.ObjectId[],
}

const userSchema = new Schema({
    firstName: {type: String, trim: true, required: true},
    lastName: {type: String, trim: true, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    // role: {type: Role, default: Role.Viewer, required: true},
    role: {type: String, default: Role.Viewer, required: true},
    subscribers: {type:[], default: [], required: true},
    subscribed: {type:[], default: [], required: true},
    interestedEvents: {type:[], default: [], required: true},
    events: {type:[], default: [], required: true},
    avatar: {type: String, default: 'https://res.cloudinary.com/lupusawareness/image/upload/v1650405593/wugaaghxaiqoiidbitdi.jpg'},
    slug: String
})


const User = mongoose.model<UserInterface>('User', userSchema)

export {User, userSchema}