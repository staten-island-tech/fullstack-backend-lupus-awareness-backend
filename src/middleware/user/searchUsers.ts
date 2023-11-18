import { Request, Response, NextFunction } from 'express'
import {User, Role} from '../../models/User'


export const searchUsers = async (req: Request, res: Response) => {
    try {
        const Users = await User.find()
        res.json(Users)
    } catch (error) {
        res.status(400).json(error)
    }
}

