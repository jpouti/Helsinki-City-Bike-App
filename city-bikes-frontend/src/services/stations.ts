import axios from 'axios'
import { StationsData, StationInfo, StationViewOptions } from '../types'

// stations api
const baseUrl = 'http://localhost:3001/api/stations'

// parse url according to options parameters
const parseUrl = (options: StationViewOptions) => {
    let url = baseUrl

    // with page
    if (options.page) {
        // if the first query on url
        if (url.length === baseUrl.length) {
            url += `?page=${options.page}`
        } else {
            url += `&page=${options.page}`
        }
    }

    // with limit
    if (options.limit) {
        if (url.length === baseUrl.length) {
            url += `?limit=${options.limit}`
        } else {
            url += `&limit=${options.limit}`
        }
    }

    // with search
    if (options.search) {
        if (url.length === baseUrl.length) {
            url += `?search=${options.search}`
        } else {
            url += `&search=${options.search}`
        }
    }
    return url
}

// get stations according to page & limit and optional search keyword (substring of station name / address in Finnish)
// returns stations with default page and limit if paremeters not provided
export const getStations = async (options: StationViewOptions):Promise<StationsData | string> => {
    const stationsUrl = parseUrl(options)
    try {
        const request = await axios.get<StationsData>(stationsUrl)
        return request.data
    } catch (error:unknown) {
        let errorMessage = 'Error while fetching stations data.'
        if (axios.isAxiosError(error) && error.response) {
            errorMessage = ' Error: ' + error.response.data.error
        }
        return errorMessage
    }
}

// get single station according to station id
export const getSingleStation = async (id: number):Promise<StationInfo | string> => {
    try {
        const request = await axios.get<StationInfo>(`${baseUrl}/${id}`)
        return request.data
    } catch (error:unknown) {
        let errorMessage = 'Error while fetching single station data.'
        if (axios.isAxiosError(error) && error.response) {
            errorMessage = error.response.data.error
        }
        return errorMessage
    }
}