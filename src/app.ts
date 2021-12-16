import express from "express"
const port = process.env.PORT || 3000
const app = express()
import { router } from './routes/index'

app.use('/', router)
app.listen(port, ()=> {
    console.log(`server is up on port ${port}`)
})

