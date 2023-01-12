import * as express from "express"
import { IStation } from "../models/station"

const router = express.Router()

const Station = require('../models/station')

declare module 'express' {
    export interface Request {
        station?: IStation
    }
}

// get stations on default 10 stations per page
// default view/order -> ASC by station id
router.get('/', async (req, res) => {

    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const conditions = {}
    try {
        const result = await Station.findAll({
            order: [['id', 'ASC']],
            offset: limit * (page - 1),
            limit: limit,
            where: conditions,
        })
        res.json(result)

    } catch (error:any) {
        res.status(400).json({ error: 'Error while getting stations..: ' + error.message})
    }
})

// find corresponding station by id
const stationFinder = async (req:express.Request, _res:express.Response, next: express.NextFunction) => {
    req.station = await Station.findByPk(req.params.id)
    next()
}

// get single station
router.get('/:id', stationFinder, async (req:express.Request, res) => {
    if (req.station) {
        res.json(req.station)
    } else {
        res.status(404).send({ error: `Error.. Station not found with id: ${req.params.id}`})
    }
})

module.exports = router

export {}