import multer from 'multer'
import { Request, Response, NextFunction } from 'express'



  export const upload = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const upload = multer({
            limits: {
              fileSize: 2000000
            },
            fileFilter(req, file, cb) {
              if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                return cb(new Error("Please upload a jpg, jpeg or png only"));
              }
              cb(null, true);
            }
          })
          upload.single('image')
        next()     
    } catch (error) {
        res.json(error)
    }
}

  

