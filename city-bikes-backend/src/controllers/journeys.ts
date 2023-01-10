import express from "express"

const router = express.Router()

const Journey = require('../models/journey')

// get journeys on default 10 journeys per page
// default view/order -> latest bike returns
router.get('/', async (req, res) => {

    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const conditions = {}
    try {
        const result = await Journey.findAll({
            attributes: { exclude: ['id'] },
            order: [['return', 'DESC']],
            offset: page - 1,
            limit: limit,
            where: conditions,
        })
        res.json(result)

    } catch (error:any) {
        res.status(400).json({ error: 'Error while getting journeys..: ' + error.message})
    }
})

module.exports = router

export {}