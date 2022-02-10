import express from 'express'
import passportLocal from 'passport-local'
const LocalStrategy = passportLocal.Strategy
import bcrypt from 'bcryptjs'
import {User, userSchema, userModel} from '../models/User'
import passport from 'passport'

import { Request, Response, NextFunction } from "express";
import { NativeError } from "mongoose";


passport.use(new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    userModel.findOne({ email: email.toLowerCase() }, (err: NativeError, user: User) => {
        if (err) { return done(err); }
        if (!user) {
            return done(undefined, false, { message: `Email ${email} not found.` });
        }
        user.comparePassword(password, (err: Error, isMatch: boolean) => {
            if (err) { return done(err); }
            if (isMatch) {
                return done(undefined, user);
            }
            return done(undefined, false, { message: "Invalid email or password." });
        });
    });
}));

passport.serializeUser<any, any>((req, user, done) => {
    done(undefined, user);
});

passport.deserializeUser((id, done) => {
    userModel.findById(id, (err: NativeError, user: User) => done(err, user));
});

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};