const Station = require('../models/station')
const Journey = require('../models/journey')

Journey.sync()
Station.sync()

module.exports = {
    Journey, Station
}