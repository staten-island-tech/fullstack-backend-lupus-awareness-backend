import dotenv from 'dotenv'
import { Request, Response, NextFunction } from 'express'
import multer from 'multer'
dotenv.config()

const upload = multer()

const cloudinary = require("cloudinary").v2

// cloudinary.api.create_upload_preset({
//     name: 'demo_preset',
//     tags: 'baby, winter, snow',
//     folder: 'babies',
//     allowed_formats: 'jpg, png'
//   })
//   .then((uploadResult: any) => console.log(uploadResult))
//   .catch((error:any) => console.error(error));

  export const uploadMedia = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const imageFile = req.files
        // cloudinary.uploader
        // .upload(imageFile, 
        // { public_id: 'fileName' }, 
        // function (error:any, result: any) { console.log(result, error); });
        console.log(imageFile)
    } catch (error) {
        res.json(error)
        console.log(error)
    }
}