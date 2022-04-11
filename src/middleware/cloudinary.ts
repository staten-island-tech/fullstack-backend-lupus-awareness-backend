import dotenv from 'dotenv'
import { Request, Response, NextFunction } from 'express'
import { User } from '../models/User'
dotenv.config()

const cloudinary = require("cloudinary").v2




  export const uploadMedia = async(req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(req.body.payload)
        console.log(req.body.payload)
        // let user = await User.findOne({ _id: req.body.payload._id });
        // const imageFile = req.file?.path
        // cloudinary.uploader.upload(imageFile, function(error: TypeError, result: any) {console.log(result, error)})
        // .then((result:any) =>{
        //     const image = result.url
        //     res.json(image)
            
        // });
    } catch (error) {
        res.json(error)
        console.log(error)
    }
}