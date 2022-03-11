import Joi from "joi"
import { Request, Response, NextFunction } from 'express'

export const joiSchema = Joi.object(
    {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required()
    }
)

export const userJoi = async(req: Request, res: Response, next: NextFunction) => {
    const joiSchema = Joi.object(
        {
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().required().email(),
            password: Joi.string().min(6).required()
        }
    )
    try {
        
        next()     
    } catch (error) {
        res.json(error)
    }
}