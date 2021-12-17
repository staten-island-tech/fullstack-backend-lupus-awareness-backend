import express, {Request, Response} from 'express'

export const homePage = async (req: Request, res: Response) => {
    interface User {
        readonly id: number,
        name: string,
        admin: boolean,
        gender?: string
    }
    const newUser: User ={
        id: 1234,
        name: 'bobby',
        admin: false,
        gender: 'unspecified'
    }
    newUser.name = 'asdf'
    try {
        res.json(newUser)
    } catch (error) {
        console.log(error)
    }
};
