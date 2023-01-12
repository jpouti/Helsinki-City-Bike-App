const express = require('express')

const app = express()

const journeysRouter = require('./controllers/journeys')
const stationsRouter = require('./controllers/stations')

app.use(express.json())

// routes
app.use('/api/journeys', journeysRouter)
app.use('/api/stations', stationsRouter)

// check
app.get('/', (_req:any, res:any) => {
    res.send('check')
})

module.exports = app

export {}