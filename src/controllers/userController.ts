import { Request, Response, NextFunction } from 'express'
import { stringify } from 'querystring'
import jwksRsa from 'jwks-rsa'
import jwt from 'express-jwt'
import jwtAuthz from 'express-jwt-authz'
import { isShorthandPropertyAssignment } from 'typescript'
import  { auth } from 'express-openid-connect'
import { requiresAuth } from 'express-openid-connect'
import { userModel } from '../models/User'
const User = userModel



export const createUser = async (req: Request, res: Response) => {
    try {
        const authResponse = req.oidc.user 
        const newUser = new User(req.body)
        await newUser.save()
         res.json(newUser)
    } catch (error) {
        res.json(error)
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        const Users = await User.find()
        res.json(Users)
    } catch (error) {
        res.json(error)
    }
}

export const updateUsers = async (req: Request, res: Response) => {
    try {
        const user: any = await User.findById(req.params.id)
        const updates: string[] = Object.keys(req.body)
        updates.forEach((e: string) => ( user![e] = req.body[e]))
        await user.save()
        res.json(updates)
    } catch (error) {
        res.json(error)
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
   
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            res.status(404).send()
        }
        res.json(`${user!.name} was deleted from DB`)
    } catch (error) {
        console.log(error)
    }
}


export const test = async (req: Request, res: Response) => {
    try {
        function create(user, callback) {
            const bcrypt = require('bcrypt');
            const MongoClient = require('mongodb@3.1.4').MongoClient;
              const client = new MongoClient('mongodb+srv://jwang:Seagull485@cluster0.zs7ne.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
          
          
          
            client.connect(function (err) {
              if (err) return callback(err);
          
              const db = client.db('myFirstDatabase');
              const users = db.collection('users');
          
              users.findOne({ email: user.email }, function (err, withSameMail) {
                if (err || withSameMail) {
                  client.close();
                  return callback(err || new Error('the user already exists'));
                }
          
                bcrypt.hash(user.password, 10, function (err, hash) {
                  if (err) {
                    client.close();
                    return callback(err);
                  }
          
                  user.password = hash;
                  users.insert(user, function (err, inserted) {
                    client.close();
          
                    if (err) return callback(err);
                    callback(null);
                  });
                });
              });
            });
          }
    } catch (error) {
        res.json(error)
    }
}


