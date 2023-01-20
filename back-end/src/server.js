import express from 'express'
import bodyParser from 'body-parser' // /user?id=7 - to get value 7, need to use bodyParser
import viewEngine from './config/viewEngine'
import initWebRoutes from './route/web'
import userRoute from './route/userRoute'
import connectDB from './config/connectDB'
import cors from 'cors'

// config dotenv
require('dotenv').config()

// config app. *need to import on top
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const corsOptions = {
  origin: process.env.REACT_APP_FRONTEND_URL || 'http://localhost:3000',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions))

viewEngine(app)

// Mount the route
initWebRoutes(app)
userRoute(app)

connectDB()

const port = process.env.PORT || 6969 // if port === undefined => port = 6969

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
