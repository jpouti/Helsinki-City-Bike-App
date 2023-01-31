/* Journey view types */

export interface JourneysData {
    journeys: IJourney[]
    count: number
}

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
    search: string | null
}

/* Stations view types */

export interface StationsData {
    stations: IStation[]
    count: number
}

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

export interface StationInfo extends IStation {
    n_departures: number
    n_returns: number
}

export interface StationViewOptions {
    page: number | null
    limit: number | null
}