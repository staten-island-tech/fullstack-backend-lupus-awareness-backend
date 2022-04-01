import dotenv from 'dotenv'
import { Request, Response, NextFunction } from 'express'
dotenv.config()


const cloudinary = require("cloudinary").v2

cloudinary.api.create_upload_preset({
    name: 'demo_preset',
    tags: 'baby, winter, snow',
    folder: 'babies',
    allowed_formats: 'jpg, png'
  })
  .then((uploadResult: any) => console.log(uploadResult))
  .catch((error:any) => console.error(error));

  export const uploadMedia = async(req: Request, res: Response, next: NextFunction) => {
    try {
        cloudinary.uploader
        .upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg", 
        { public_id: "olympic_flag" }, 
        function (error:any, result: any) { console.log(result, error); });
    } catch (error) {
        res.json(error)
    }
}