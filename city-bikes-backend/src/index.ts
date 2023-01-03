const config = require('./utils/config')
const express = require('express')

const app = express()

// const mongoose = require('mongoose')

app.get('/', (_req:any, res:any) => {
    res.send('check')
})

/*
mongoose
    .connect(config.MONGO_URL)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error: any) => {
        console.log('error connecting to MongoDB', error.message)
    })
*/

app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`)
})

export {}