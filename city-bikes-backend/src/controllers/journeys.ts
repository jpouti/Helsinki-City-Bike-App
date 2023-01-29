import express from "express"

const router = express.Router()

const Journey = require('../models/journey')

// get journeys on default 10 journeys per page
// default view/order -> latest bike returns
router.get('/', async (req, res) => {

    const page = parseInt(req.query.page as string) || 0
    const limit = parseInt(req.query.limit as string) || 10
    // first page 0 offset, otherwise page - 1
    const offset = limit * page
    console.log(page, 'page')
    console.log(offset, 'offset')
    const conditions = {}
    try {
        const result = await Journey.findAll({
            attributes: { exclude: ['id'] },
            order: [['return', 'DESC']],
            offset: offset,
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