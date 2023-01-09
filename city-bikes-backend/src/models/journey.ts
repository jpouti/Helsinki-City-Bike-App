const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

export interface IJourney {
    departure: Date
    return: Date
    departureStationId: number
    departureStationName: string
    returnStationId: number
    returnStationName: string
    distance: number
    duration: number
}

class Journey extends Model {}

Journey.init({
    departure: { type: DataTypes.DATE, allowNull: false },
    return: { type: DataTypes.DATE, allowNull: false },
    departureStationId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'stations', key: 'id' } },
    departureStationName: { type: DataTypes.TEXT, allowNull: false },
    returnStationId:  { type: DataTypes.INTEGER, allowNull: false, references: { model: 'stations', key: 'id' } },
    returnStationName: { type: DataTypes.TEXT, allowNull: false },
    distance: { type: DataTypes.FLOAT, allowNull: false, validate: { min: { args: 10, msg: 'Journeys must be longer than 10 (m'} } },
    duration: { type: DataTypes.FLOAT, allowNull: false, validate: { min: { args: 10, msg: 'Journeys must be longer than 10 (m' } } },
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'journey'
})

module.exports = Journey