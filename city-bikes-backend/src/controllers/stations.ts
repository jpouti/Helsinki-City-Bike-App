import express from "express"

const router = express.Router()

const Station = require('../models/station')

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

module.exports = router

export {}