/* Journey view types */

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

export interface JourneyViewOptions {
    page: number | null
    limit: number | null
}