import express from "express"

import { router } from './routes/index'

const port = process.env.PORT || 3000
const app = express();

app.use('/', router)
app.listen(port, ()=> {
    console.log(`server is up on port ${port}`)
})

