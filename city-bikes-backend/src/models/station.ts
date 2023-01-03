import { Schema, model } from 'mongoose'

interface IStation {
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
    yCoor: number
}

const stationSchema = new Schema<IStation>({
    id: { type: Number, required: true },
    nimi: { type: String, required: true },
    namn: { type: String, required: true },
    name: { type: String, required: true },
    osoite: { type: String, required: true },
    adress: { type: String, required: true },
    kaupunki: { type: String, required: true },
    stad: { type: String, required: true },
    operaattori: { type: String, required: true },
    kapasiteetti: { type: Number, required: true },
    xCoord: { type: Number, required: true },
    yCoor: { type: Number, required: true },
})

module.exports = model('Station', stationSchema)