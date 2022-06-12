"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEvent = void 0;
const User_1 = require("../../models/User");
const Event_1 = require("../../models/Event");
const cloudinary = require("cloudinary").v2;
const createEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // if(req.body.payload.role === Role.Student) {return res.status(400).json('Students cannot create events')}
    // console.log(req.files)
    try {
        // const image = req.file!.path
        // cloudinary.uploader.upload(image,{
        //   folder:"Fullstack/Event"
        // }, function(error: TypeError, result: any) {console.log(result, error)})
        // .then(async (result: any) => {
        //     const event = new Event({
        //     user: req.body.payload,
        //     name: req.body.name,
        //     hours: req.body.hours,
        //     start: req.body.start,
        //     end: req.body.end,
        //     location: req.body.location,
        //     description: req.body.description,
        //     media: result.url,
        //     // tags: req.body.tags
        //     });
        // await event.save();
        // await User.findOneAndUpdate({ _id: req.body.payload._id },
        // {$push: {events: event._id}}
        // );
        // res.json(event)
        // })
        const event = new Event_1.Event({
            user: req.body.payload,
            name: req.body.name,
            hours: req.body.hours,
            start: req.body.start,
            end: req.body.end,
            location: req.body.location,
            description: req.body.description,
            media: req.body.media,
            // tags: req.body.tags
        });
        yield event.save();
        yield User_1.User.findOneAndUpdate({ _id: req.body.payload._id }, { $push: { events: event._id } });
        res.json(event);
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
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.createEvent = createEvent;
