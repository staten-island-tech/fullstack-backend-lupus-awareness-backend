import { Request, Response, NextFunction } from "express";
import { User, Role } from "../../models/User";
import { Event } from "../../models/Event";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { callbackify } from "util";
const cloudinary = require("cloudinary").v2;

export const createEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // if(req.body.payload.role === Role.Student) {return res.status(400).json('Students cannot create events')}
  // console.log(req.files)
  try {
    const image = req.file!.path
    console.log(image)
    cloudinary.uploader.upload(image,{
      folder:"Fullstack/Event"
    }, function(error: TypeError, result: any) {console.log(result, error)})
    .then(async (result: any) => {
        const event = new Event({
        user: req.body.payload,
        name: req.body.name,
        hours: req.body.hours,
        start: req.body.start,
        end: req.body.end,
        location: req.body.location,
        description: req.body.description,
        media: result.url,
        // tags: req.body.tags
        });
    await event.save();
    await User.findOneAndUpdate({ _id: req.body.payload._id },
    {$push: {events: event._id}}
    );
    res.json(event)


    })
    // const event = new Event({
    //       user: req.body.payload,
    //       name: req.body.name,
    //       hours: req.body.hours,
    //       start: req.body.start,
    //       end: req.body.end,
    //       location: req.body.location,
    //       description: req.body.description,
    //       media: req.body.media,
    //       // tags: req.body.tags
    //       });
    //   await event.save();
    //   await User.findOneAndUpdate({ _id: req.body.payload._id },
    //   {$push: {events: event._id}}
    //   );
    //   res.json(event)
    
    // const media = req.files!.map(image =>{
    //   return image!.path
    // })
    // res.json(media)

    // const images = req.files!.map((image: any) => {
    //   return new Promise((resolve, reject) =>{
    //     resolve(
    //             cloudinary.uploader
    //     .upload(
    //       image!.path,
    //       {
    //         folder: "Fullstack/Event",
    //       },
    //       function (error: TypeError, result: any) {
    //         media.push(result.url)
    //       }
    //     )
    //     )
    //   }) 
    // })

    // Promise.all(images)
    // .then(results => callbackify(results))
    // .catch(error => callbackify(error));
    
    


    // const event = new Event({
    //     user: req.body.payload,
    //     name: req.body.name,
    //     hours: req.body.hours,
    //     start: req.body.start,
    //     end: req.body.end,
    //     location: req.body.location,
    //     description: req.body.description,
    //     // media: media,
    //     // tags: req.body.tags
    //     });
    // await event.save();
    // await User.findOneAndUpdate({ _id: req.body.payload._id },
    // {$push: {events: event._id}}
    // );
    // res.json(event)



    // const imageFile = req.file!.path;
// res.json(imageFile)
    // const media = [];
    // const image = imageFiles?.map(image => {
    //   return image.path
    // })

    // res.json(image)

    // cloudinary.uploader
    //     .upload(
    //       imageFile,
    //       {
    //         folder: "Fullstack/Event",
    //       },
    //       function (error: TypeError, result: any) {
    //         console.log(result, error)
    //       }
    //     ).then(async(result :any) => {
    //       return new Promise((resolve, reject) => {
    //         resolve(media.push(result.url))
    //       })
    //       // Promise.all(media).then(results => callback(results))
    //     })

    //     res.json(media)

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
