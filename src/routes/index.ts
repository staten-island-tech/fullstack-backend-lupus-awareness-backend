import express from 'express'
const router = express.Router()

router.get('/', async (req, res) => {
    interface User {
        readonly id: number,
        name: string,
        admin: boolean,
        gender?: string
    }
    const newUser: User ={
        id: 1234,
        name: 'bobby',
        admin: false,
    }
    try {
        res.send(req.query)
    } catch (error) {
        console.log(error)
    }
})

router.get('/user/:id', async(req,res) => {
    try {
        res.json(req.params)
    } catch (error) {
        console.log(error)
    }
})

module.exports = {router}