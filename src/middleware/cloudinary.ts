import dotenv from 'dotenv'
import { Request, Response, NextFunction } from 'express'
import multer from 'multer'
import datauri from 'datauri'
import path from 'path'
dotenv.config()

const cloudinary = require("cloudinary").v2

  export const uploadMedia = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const dUri = await datauri(req.files)
        console.log(dUri)
        // console.log('req.body:', req.files)
        // const dataUri = (req: Request) => dUri.format(path.extname(req.file!.originalname).toString(), req.file!.buffer)
        // const file = dataUri(req).content
        // res.json(file)
        // return cloudinary.uploader.upload(file).then((result: any) => {
        //     const image = result.url
        //     res.json(image)
        // }).catch((err: any) =>{
        //     res.json(err)
        // })
    //   res.json(imageFile!.name)
    } catch (error) {
        res.json(error)
        console.log(error)
    }
}