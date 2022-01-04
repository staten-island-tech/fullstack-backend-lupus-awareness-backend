import { Request, Response, NextFunction } from 'express'
import { userModel } from '../models/User'
const User = userModel

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.user) {
        next()
    } else {
        res.json('sign in please')
    }
}

export const authPage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(`hello, ${req.body.user}`)
    } catch (error) {
        console.log(error)
    }
}

export const homePage = async (req: Request, res: Response) => {
    interface User {
        readonly id: number,
        name: string,
        admin: boolean,
        gender?: string
    }
    const newUser: User ={
        id: 1234,
        name: 'bob',
        admin: false,
        gender: 'unspecified'
    }
    try {
        res.json(newUser)
    } catch (error) {
        console.log(error)
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = new User(req.body)
        await user.save()
        res.json(user)
        
    } catch (error) {
        res.json(error)
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        const Users = await User.find()
        res.json(Users)
    } catch (error) {
        res.json(error)
    }
}

export const updateUsers = async (req: Request, res: Response) => {
    try {
        const Users = await User.findById(req.params.id)
        const updates = Object.keys(req.body)
<<<<<<< HEAD
        updates.forEach((e) = ( Users[e] = req.body[e]))
=======
        updates.forEach((e: string) => ( Users[e] = req.body[e]))
>>>>>>> bf4f71bf551352ad92fb300f242609f00f97849c
        console.log(updates)
        res.json(updates)
    } catch (error) {
        res.json(error)
    }
}

