import dotenv from 'dotenv'
import { Request, Response, NextFunction } from 'express'
import multer from 'multer'
import { User } from '../models/User'
import { Event } from '../models/Event'
dotenv.config()

const cloudinary = require("cloudinary").v2
// import { cloudinary, uploader } from 'cloudinary'

  //Upload profile image
  export const uploadProf = async(req: Request, res: Response, next: NextFunction) => {
    try {
      res.json(req.body.payload)
      // let user = await User.findOne({ _id: req.body.payload._id });
      // console.log(user!._id)
      // const imageFile = req.file?.path
      // console.log(imageFile)

      //   cloudinary.uploader.upload(imageFile,{
      //     folder:"Fullstack/Profile"
      //   }, function(error: TypeError, result: any) {console.log(result, error)})
      //   .then(async (result:any) =>{
      //       const image = result.url
      //       console.log(image)
      //       await User.updateOne(
      //         {'_id': req.body.payload._id},
      //         { $set: { avatar: image }}
      //     )
      //       res.json(user)
      //   });
    } catch (error) {
        res.json(error)
        console.log(error)
    }
}

//Upload event images
export const uploadEvent = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const event = await Event.findOne({ _id: req.params.id })
    const imageFiles = req.files
    imageFiles?.forEach((el: any) => {
      console.log(el.path)
      const file = el.path
      cloudinary.uploader.upload(file,{
        folder:"Fullstack/Event"
      }, function(error: TypeError, result: any) {console.log(result, error)})
      .then(async (result: any) =>{
          const image = result.url
         console.log(image)
          await Event.updateOne(
            {'_id': req.params.id},
            { $push: { media: image }}
        )
         
      });
    })
    res.json(event)
  } catch (error) {
      res.json(error)
      console.log(error)
  }
}