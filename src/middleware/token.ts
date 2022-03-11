import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export const requiresAuth = async(req: Request, res: Response, next: NextFunction) => {
    const token = req.header('auth-token')
    if(!token) return res.json('access denied')
    try {
       jwt.verify(token, process.env.PRIVATEKEY as string)  
        next()     
    } catch (error) {
        res.json(error)
    }
}