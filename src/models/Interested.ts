import { object } from 'joi'
import mongoose, { Schema, model, connect } from 'mongoose'
import {UserAttributes, UserInterface, userSchema} from './User'

interface interestedInterface {
    user: UserAttributes,
}
