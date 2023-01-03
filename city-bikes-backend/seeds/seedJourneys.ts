const config = require('../src/utils/config')

const mongoose = require('mongoose')

mongoose
    .connect(config.MONGO_URL)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error: any) => {
        console.log('error connecting to MongoDB', error.message)
    })

export {}