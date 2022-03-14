import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User, UserAttributes, UserInterface } from '../models/User'
import {Event} from '../models/Event'
import bcrypt from 'bcryptjs'
import {joiSchema} from '../middleware/validation_schema'

export const getUsers = async (req: Request, res: Response) => {
    try {
        const Events = await Event.find()
        res.json(Events)
    } catch (error) {
        res.json(error)
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {

        // //validate user
       const result = await joiSchema.validateAsync(req.body)

    //find an existing user
        let doesExist = await User.findOne({ email: result.email });
        if (doesExist) return res.status(400).send("User already registered.");
    
        const user = new User(result)
        user.password = await bcrypt.hash(result.password, 10);
        await user.save();
    res.json(user)
    } catch (error) {
        console.log(error)
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email: email })
        if (!existingUser) {
            res.json('email not registered')
        }
        const validPassword = bcrypt.compareSync(password, existingUser!.password)
        console.log(validPassword)
        if (!validPassword) {
            res.json('not valid')
            return
        }
        console.log('valid')
        const payload: UserAttributes = {
            firstName: existingUser!.firstName,
            email: existingUser!.email,
            role: existingUser!.role
        }
        const userToken = jwt.sign(payload, process.env.PRIVATEKEY as string)
        res.header('auth-token', userToken).send(userToken)
    } catch (error) {
        console.log(error)
    }
}


export const updateUsers = async (req: Request, res: Response) => {
    try {
        const user : any = await User.findById(req.params.id)
        const updates: string[] = Object.keys(req.body)
        updates.forEach((e: string) => ( user![e] = req.body[e]))
        await user.save()
        res.json(updates)
    } catch (error) {
        res.json(error)
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
   
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            res.status(404).send()
        }
        res.json(`${user!.firstName} ${user!.lastName} was deleted from DB`)
    } catch (error) {
        console.log(error)
    }
}

// export const getProfile = async (req: Request, res: Response) => {
//     try {
//        const user = await User.findOne({ email: req.oidc.user.email}).exec();
//         // const user = await User.findById(id)
//         // res.send(req.oidc.idToken)
//         res.send(user)

 
//     } catch (error) {
//         console.log(error)
//     }
// }
