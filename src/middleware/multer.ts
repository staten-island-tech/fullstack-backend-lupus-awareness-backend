import multer from 'multer'
import { Request, Response, NextFunction } from 'express'
// const { CloudinaryStorage } = require("multer-storage-cloudinary");

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
          });
          // const storage = new CloudinaryStorage({
          //   cloudinary: cloudinary,
          //   params: {
          //     folder: "DEV",
          //   },
          // });

  module.exports = upload