const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

export interface IStation {
    id: number
    nimi: string
    namn: string
    name: string
    osoite: string
    adress: string
    kaupunki: string
    stad: string
    operaattori: string
    kapasiteetti: number
    xCoord: number
    yCoord: number
}

class Station extends Model {}

Station.init({
    id: { type: DataTypes.INTEGER, allowNull: false, unique: true, primaryKey: true },
    nimi: { type: DataTypes.TEXT, allowNull: false },
    namn: { type: DataTypes.TEXT, allowNull: false },
    name: { type: DataTypes.TEXT, allowNull: false },
    osoite: { type: DataTypes.TEXT, allowNull: false },
    adress: { type: DataTypes.TEXT, allowNull: false },
    kaupunki: { type: DataTypes.TEXT, allowNull: false },
    stad: { type: DataTypes.TEXT, allowNull: false },
    operaattori: { type: DataTypes.TEXT, allowNull: false },
    kapasiteetti: { type: DataTypes.TEXT, allowNull: false },
    xCoord: { type: DataTypes.FLOAT, allowNull: false },
    yCoord: { type: DataTypes.FLOAT, allowNull: false },
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'station'
})

module.exports = Station