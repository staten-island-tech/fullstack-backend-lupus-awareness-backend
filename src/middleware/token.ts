import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export const requiresAuth = async(req: Request, res: Response, next: NextFunction) => {
    const token = req.header('auth-token')
    if(!token) return res.json('access denied')
    try {
        console.log(jwt.verify(token, process.env.PRIVATEKEY as string))
        res.json(jwt.verify(token, process.env.PRIVATEKEY as string))        
    } catch (error) {
        res.json(error)
    }
}