import { Request, Response, NextFunction } from 'express'
import { User, UserAttributes, UserInterface } from '../../models/User'


export const logout = async (req: Request, res: Response) => {
    try {
        console.log(req.cookies)
        const token = req.cookies['auth-token']
        console.log(token)
        if(!token) return res.json('you are not signed in')
        res.clearCookie('auth-token')
    } catch (error) {
        res.json(error)
    }
}

