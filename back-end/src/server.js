import express from 'express'
import bodyParser from 'body-parser' // /user?id=7 - to get value 7, need to use bodyParser
import viewEngine from './config/viewEngine'
import initWebRoutes from './route/web'

// config dotenv
require('dotenv').config()

// config app
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app)
initWebRoutes(app)

const port = process.env.PORT || 6969 // if port === undefined => port = 6969

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
