import * as express from "express"
import { IStation } from "../models/station"

const router = express.Router()
const { Op } = require('sequelize')

const { Station, Journey } = require('../models/')

interface StationInfo extends IStation {
    n_departures?: number // number of journeys starting from the station
    n_returns?: number // number of journeys ending for the station
} 

declare module 'express' {
    export interface Request {
        station?: StationInfo
        error?: string
    }
}

// get stations on default 10 stations per page
// default view/order -> ASC by station id
router.get('/', async (req, res) => {

    const page = parseInt(req.query.page as string) || 0
    const limit = parseInt(req.query.limit as string) || 10
    const offset = limit * page
    let conditions = {}

    // search keyword for station name / station address in Finnish language
    if (req.query.search) {
        // Capitalize the first letter and rest as lower case
        let search = (req.query.search as string).toLowerCase()
        search = search.charAt(0).toUpperCase() + search.slice(1)

        // if substring exists either start of the station name / address with capitalized letter
        // or any other position of the station name / address with lower case
        conditions = {
            [Op.or]: [
                {
                    name: {
                        [Op.substring]: search,
                    }
                },
                {
                    name: {
                        [Op.substring]: (req.query.search as string).toLowerCase(),
                    }
                },
                {
                    osoite: {
                        [Op.substring]: search,
                    }
                },
                {
                    osoite: {
                        [Op.substring]: (req.query.search as string).toLowerCase(),
                    }
                },
            ]
        }
    }

    // get stations from db
    try {
        const stations = await Station.findAll({
            order: [['id', 'ASC']],
            offset: offset,
            limit: limit,
            where: conditions,
        })
        // count of all the stations
        const count = await Station.count({
            where: conditions,
        })
        res.json({ stations, count })

    } catch (error:any) {
        res.status(400).json({ error: 'Error while getting stations..: ' + error.message})
    }
})

// find corresponding station by id
const stationFinder = async (req:express.Request, _res:express.Response, next: express.NextFunction) => {
    try {
        req.station = await Station.findByPk(req.params.id)
    } catch (error:unknown) {
        if (error instanceof Error) {
            req.error = error.name
        }
    }
    next()
}

// get single station
router.get('/:id', stationFinder, async (req:express.Request, res) => {
    if (req.station) {
        const station = JSON.parse(JSON.stringify(req.station))
        const journeyStarting = await Journey.count({ col: 'departure_station_id', where: { departureStationId: req.station.id } })
        const journeysEnding = await Journey.count({ col: 'return_station_id', where: { returnStationId: req.station.id } })

        station.n_departures = journeyStarting
        station.n_returns = journeysEnding
        res.json(station)
    } else if (req.error === 'SequelizeDatabaseError') {
        res.status(400).send({ error: 'Invalid input syntax for id, please give station id for type integer'})
    } else if (!req.station) {
        res.status(404).send({ error: `Error.. Station not found. Invalid station id: ${req.params.id}`})
    }
})

module.exports = router

export {}