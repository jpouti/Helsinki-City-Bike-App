const express = require('express')
const cors = require('cors')

const app = express()

const journeysRouter = require('./controllers/journeys')
const stationsRouter = require('./controllers/stations')

app.use(express.json())
app.use(cors())
app.use(express.static('../city-bikes-frontend/build'))

// routes
app.use('/api/journeys', journeysRouter)
app.use('/api/stations', stationsRouter)

// check
app.get('/', (_req:any, res:any) => {
    res.send('check')
})

module.exports = app

export {}