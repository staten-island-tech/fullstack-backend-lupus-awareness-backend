import express from "express"
import { router } from './routes/index'
import './DB/mongoose'

const port = process.env.PORT || 3000
const app = express();

//raw requests are now usable properties on req.body
app.use(express.json())
app.use(express.urlencoded())

app.use('/', router)
app.listen(port, ()=> {
    console.log(`server is up on port ${port}`)
})

