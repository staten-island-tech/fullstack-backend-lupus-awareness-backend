import dotenv from 'dotenv'
import { Request, Response, NextFunction } from 'express'
import multer from 'multer'
import { User } from '../models/User'
const upload = require('../middleware/multer')
dotenv.config()

const cloudinary = require("cloudinary").v2
// import { cloudinary, uploader } from 'cloudinary'


  export const uploadMedia = async(req: Request, res: Response, next: NextFunction) => {
    try {
      let user = await User.findOne({ _id: req.body.payload._id });
      console.log(user!._id)
      const imageFile = req.file?.path
      console.log(imageFile)

        cloudinary.uploader.upload(imageFile, function(error: TypeError, result: any) {console.log(result, error)})
        .then(async (result:any) =>{
            const image = result.url
            console.log(image)
            await User.updateOne(
              {'_id': req.body.payload._id},
              { $set: { avatar: image }}
          )
            res.json(user)
        });
    } catch (error) {
        res.json(error)
        console.log(error)
    }
}