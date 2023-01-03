import { Schema, model } from 'mongoose'

interface IJourney {
    departure: Date
    return: Date
    departureStationId: number
    departureStationName: string
    returnStationId: number
    returnStationName: string
    distance: number
    duration: number
}

const journeySchema = new Schema<IJourney>({
    departure: { type: Date, required: true },
    return: { type: Date, required: true },
    departureStationId: { type: Number, required: true },
    departureStationName: { type: String, required: true },
    returnStationId: { type: Number, required: true },
    returnStationName: { type: String, required: true },
    distance: { type: Number, min: [10, 'Only journeys longer than 10 meters are valid'], required: true },
    duration: { type: Number, min: [10, 'Only journeys longer than 10 seconds are valid'], required: true },
})

module.exports = model('Journey', journeySchema)