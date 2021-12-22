import mongoose, { Schema, model, connect } from 'mongoose'
import {config} from 'dotenv'

config({ path: '../../variables.env' })
console.log(typeof process.env.DATABASE)
// mongoose.connect(`${process.env.DATABASE}`)
// mongoose.connection.on('error', (err) => {
//     console.log(err.message)
// })