import express from "express"
import { PORT, DATABASE_URI } from "./config.js"
import mongoose from "mongoose"
import booksRoute from './routes/booksRoute.js'
import cors from 'cors'

const app = express()

// middleware for parsing req body
app.use(express.json())

//middleware for handling cors policy
// app.use(cors()) // allow all origins with default of cors
// allow custom origins
app.use(cors())
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-type']
// }))

// http method for getting route
app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send('MERN')
})

// refractor node js routes with express
app.use('/books', booksRoute)

mongoose
    .connect(DATABASE_URI)
    .then(() => {
        console.log("App connected to DB.")
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`)
        })
    })
    .catch((err) => {
        console.log(err)
    })