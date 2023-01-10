const config = require('./utils/config')
const express = require('express')
const { connectToDatabase } = require('./utils/db')

const app = express()

const journeysRouter = require('./controllers/journeys')

app.use(express.json())

// routes
app.use('/api/journeys', journeysRouter)

// check
app.get('/', (_req:any, res:any) => {
    res.send('check')
})

const start = async () => {
    await connectToDatabase()
    app.listen(config.PORT, () => {
        console.log(`Server is running on port ${config.PORT}`)
    })
}

start()

export {}