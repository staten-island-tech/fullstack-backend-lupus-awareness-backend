import dotenv from 'dotenv'
import { Request, Response, NextFunction } from 'express'
import Datauri from 'datauri'
import path from 'path'
dotenv.config()

const cloudinary = require("cloudinary").v2




  export const uploadMedia = async(req: Request, res: Response, next: NextFunction) => {
    try {
        // const dUri = new Datauri(req)
        // const fileBuffer = req.files!.image.data
        // console.log(fileBuffer)
        // res.json(fileBuffer.toString('base64url'))


        // const dataUri = (req: Request) => 
        // dUri.format(path.extname(req.files!.image.name).toString(), req.files!.image.data)
        // const file = dataUri(req).content
        // console.log(file)

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