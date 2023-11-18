import { Request, Response, NextFunction } from 'express'
import { User } from "../../models/User";

export const getUser = async (req: Request, res: Response) => {
    try {
        const userID = req.params.id
        let user = await User.findById(userID)
        return res.json(user)
    } catch (error) {
        res.status(400).json(error)
    }
}
 