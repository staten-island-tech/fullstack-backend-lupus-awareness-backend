import express from 'express'
import { homePage } from '../controllers/userController'
const router = express.Router()

router.get('/', homePage)

export {router}