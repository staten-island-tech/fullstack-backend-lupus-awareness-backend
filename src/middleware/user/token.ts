import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export const requiresAuth = async (req: Request, res: Response, next: NextFunction) => {
    // const token = req.cookies['auth-token']
    const token = req.header('auth-token')
    console.log(token)
    if(!token) return res.json('access denied')
    try {
        console.log(req.body)
       const payload: Object = jwt.verify(token, process.env.PRIVATEKEY as string)
       req.body.payload = payload
       req.payload = payload
       console.log(req.payload)
       next()
    } catch (error) {
        res.json(error)
    }
}

export const sendUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(req.body.payload)
    } catch (error) {
        res.json(error)
    }
}