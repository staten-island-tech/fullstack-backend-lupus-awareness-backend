import Joi from "joi"
import { Request, Response, NextFunction } from 'express'

export const userJoi = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const joiSchema = Joi.object(
            {
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                email: Joi.string().required().email(),
                password: Joi.string().min(6).required()
            }
        )
        await joiSchema.validateAsync(req.body)
        next()
    } catch (error) {
        res.json(error)
    }
}
