import dotenv from 'dotenv'
import { Request, Response, NextFunction } from 'express'
import multer from 'multer'
const upload = require('../middleware/multer')
dotenv.config()

const cloudinary = require("cloudinary").v2
// import { cloudinary, uploader } from 'cloudinary'


  export const uploadMedia = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const upload = multer({
            limits: {
              fileSize: 2000000
            },
              //  storage: multer.diskStorage({}),
                fileFilter(req, file, cb) {
                  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                    return cb(new Error("Please upload a jpg, jpeg or png only"));
                  }
                  cb(null, true);
                }
              }).single('image');
              
              upload(req, res, function (err) {
                if (err) {
                    console.log(err);
                    return res.end("Error uploading file.");
                } else {
                    console.log(req.body.payload)
                    const imageFile = req.file?.path
                    console.log(imageFile)
                }
            });

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