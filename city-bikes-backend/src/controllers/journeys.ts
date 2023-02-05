import express from "express"

const router = express.Router()
const { Op } = require('sequelize')

const { Journey } = require('../models')

// get journeys on default 10 journeys per page
// default view/order -> latest bike returns
router.get('/', async (req, res) => {

    const page = parseInt(req.query.page as string) || 0
    const limit = parseInt(req.query.limit as string) || 10
    const offset = limit * page
    const column = (req.query.column as string) || 'return'
    const sort = (req.query.sort as string) || 'DESC'
    let conditions = {}

    // search keyword for departure / return stations in journeys
    if (req.query.search) {

        // Capitalize the first letter and rest as lower case
        let search = (req.query.search as string).toLowerCase()
        search = search.charAt(0).toUpperCase() + search.slice(1)

        // if substring exists either start of the station name with capitalized letter
        // or any other position of the station name with lower case
        conditions = {
            [Op.or]: [
                {
                    departureStationName: {
                        [Op.substring]: search,
                    }
                },
                {
                    departureStationName: {
                        [Op.substring]: (req.query.search as string).toLowerCase(),
                    }
                },
                {
                    returnStationName: {
                        [Op.substring]: search,
                    }
                },
                {
                    returnStationName: {
                        [Op.substring]: (req.query.search as string).toLowerCase(),
                    }
                },
            ]
        }
    }

    // get journeys from db
    try {
        const journeys = await Journey.findAll({
            attributes: { exclude: ['id'] },
            order: [[column, sort.toUpperCase()]],
            offset: offset,
            limit: limit,
            where: conditions,
        })
        const count = await Journey.count({
            where: conditions,
        })
        res.json({journeys, count})

    } catch (error:any) {
        if (error.name === 'SequelizeDatabaseError') {
            res.status(400).json({ error: 'Invalid query to db: ' + error.message})
        } else {
            res.status(400).json({ error: 'Error while getting journeys..: ' + error.message})
        }
    }
})

module.exports = router

export {}