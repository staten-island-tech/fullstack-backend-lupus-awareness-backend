import { Request, Response, NextFunction } from "express";
import { User, Role } from "../../models/User";
import { Event } from "../../models/Event";
import { CloudinaryStorage } from "multer-storage-cloudinary";
const cloudinary = require("cloudinary").v2;

export const createEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // if(req.body.payload.role === Role.Student) {return res.status(400).json('Students cannot create events')}
  // console.log(req.files)
  try {
    // const event = new Event({
    //     user: req.body.payload,
    //     name: req.body.name,
    //     hours: req.body.hours,
    //     start: req.body.start,
    //     end: req.body.end,
    //     location: req.body.location,
    //     description: req.body.description,
    //     media: req.files,
    //     tags: req.body.tags
    //     });
    // await event.save();
    // await User.findOneAndUpdate({ _id: req.body.payload._id },
    // {$push: {events: event._id}}
    // );
    // res.json(event)

    const imageFile = req.file;
  
    // const media = [];
    // const image = imageFiles?.map(image => {
    //   return image.path
    // })

    // res.json(image)

    cloudinary.uploader
        .upload(
          imageFile!.path,
          {
            folder: "Fullstack/Event",
          },
          function (error: TypeError, result: any) {
            console.log(result, error)
          }
        ).then(async(result :any) => {
          const event = new Event({
                user: req.body.payload,
                name: req.body.name,
                hours: req.body.hours,
                start: req.body.start,
                end: req.body.end,
                location: req.body.location,
                description: req.body.description,
                media: result.url,
                tags: req.body.tags
                });
            await event.save();
            await User.findOneAndUpdate({ _id: req.body.payload._id },
            {$push: {events: event._id}}
            );
            res.json(event)
        })

    // imageFiles?.forEach((el: any) => {
    //   console.log(el.path);
    //   const file = el.path;
    //   cloudinary.uploader
    //     .upload(
    //       file,
    //       {
    //         folder: "Fullstack/Event",
    //       },
    //       function (error: TypeError, result: any) {
    //         console.log(result.url)
    //       }
    //     ).then(async (result: any) => {
    //         const event = new Event({
    //     user: req.body.payload,
    //     name: req.body.name,
    //     hours: req.body.hours,
    //     start: req.body.start,
    //     end: req.body.end,
    //     location: req.body.location,
    //     description: req.body.description,
    //     media: result.url,
    //     tags: req.body.tags
    //     });
    // await event.save();
    // await User.findOneAndUpdate({ _id: req.body.payload._id },
    // {$push: {events: event._id}}
    // );
    // res.json(event)
    //     })
    // });


    // const image = imageFiles?.map(image => {
    //     const path = image.path
    //     cloudinary.uploader.upload(path, {
    //         folder:"Fullstack/Event"
    //     }, function(error: TypeError, result: any) {console.log(result, error)})
    //     .then(result => {
    //         // media.push(result.url)
    //         console.log(result.url)
    //     })
    // })

    // res.json(imageFiles)
    // const event = new Event({
    //     user: req.body.payload,
    //     name: req.body.name,
    //     hours: req.body.hours,
    //     start: req.body.start,
    //     end: req.body.end,
    //     location: req.body.location,
    //     description: req.body.description,
    //     media: req.files,
    //     tags: req.body.tags
    //     });
    // await event.save();
    // await User.findOneAndUpdate({ _id: req.body.payload._id },
    // {$push: {events: event._id}}
    // );
    // res.json(event)
  } catch (error) {
    res.status(400).send(error);
  }
};
