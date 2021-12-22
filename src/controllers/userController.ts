import express, {Request, Response, NextFunction} from 'express'

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
