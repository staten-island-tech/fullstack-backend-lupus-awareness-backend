import dotenv from 'dotenv'
import { Request, Response, NextFunction } from 'express'
dotenv.config()

const cloudinary = require("cloudinary").v2
// import { cloudinary, uploader } from 'cloudinary'


  export const uploadMedia = async(req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body.payload)
        const imageFile = req.file?.path
        cloudinary.uploader.upload(imageFile, function(error: TypeError, result: any) {console.log(result, error)})
        .then((result:any) =>{
            const image = result.url
            res.json(image)
        });
    } catch (error) {
        res.json(error)
        console.log(error)
    }
}