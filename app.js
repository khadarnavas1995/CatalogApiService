
// @-App.js(startup page)
const express = require('express')
const app = express()
const morgan = require('morgan')
const createError = require('http-errors')
const PORT = process?.env?.PORT_ADDRESS || 4000

require('dotenv').config()
require('./helper/mongoose.config')

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res, next) => {
    res.send({
        status: true,
        message: "Server is Active",
        active_on: new Date().toISOString()
    })
})

const MOBILEROUTER=require('./router/operations.router')
app.use('/api',MOBILEROUTER)
app.use((req, res, next) => {
    next(createError(404, 'Service Not Found!'))
})

app.use((err, req, res, next) => {
    res.status(err?.status || 500)
    res.send({
        status: false,
        error: err?.status,
        message: err?.message || 'Internal Server Error❗️',
    })
})

app.listen(PORT, () => {
    console.log(`server is running on port::${PORT} 🚀`);
})

