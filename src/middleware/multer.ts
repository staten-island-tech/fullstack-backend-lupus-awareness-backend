import multer from 'multer'
import { Request, Response, NextFunction } from 'express'

  const upload = async (req: Request, res: Response, next: NextFunction) => {
    try {
      multer({
        limits: {
          fileSize: 2000000
        },
           storage: multer.diskStorage({}),
            fileFilter(req, file, cb) {
              if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                return cb(new Error("Please upload a jpg, jpeg or png only"));
              }
              cb(null, true);
            }
          });
      next();
    } catch (error) {
      res.json(error)
    }
  };

  module.exports = upload