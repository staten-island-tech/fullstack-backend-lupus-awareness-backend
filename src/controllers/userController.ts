import { Request, Response, NextFunction } from 'express'
import { userModel } from '../models/User'
const User = userModel
import bcrypt from 'bcrypt'
const salt = 10


export const createUser = async (req: Request, res: Response) => {
    try {
        const newUser = new User(req.body)
        bcrypt.genSalt(salt, function(err, salt) {
            bcrypt.hash(newUser.password, salt, function(err, hash) {
               newUser.password = hash;
        console.log(hash)

            });
        });
        await newUser.save()
         res.json(newUser)
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
        const user: any = await User.findById(req.params.id)
        const updates: string[] = Object.keys(req.body)
        updates.forEach((e: string) => ( user![e] = req.body[e]))
        await user.save()
        console.log(user)
        res.json(updates)
    } catch (error) {
        res.json(error)
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
   
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            res.status(404).send()
        }
        res.json(`${user!.name} was deleted from DB`)
    } catch (error) {
        console.log(error)
    }
}

