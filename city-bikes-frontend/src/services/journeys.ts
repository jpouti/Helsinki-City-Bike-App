import axios from 'axios'
import { JourneysData, JourneyViewOptions } from '../types'

// journeys api
const baseUrl = 'http://localhost:3001/api/journeys'

// parse url according to options parameters
const parseUrl = (options: JourneyViewOptions) => {
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

    // with order -- api query for order is sort
    if (options.order) {
        if (url.length === baseUrl.length) {
            url += `?sort=${options.order}`
        } else {
            url += `&sort=${options.order}`
        }
    }

    // with orderBy -- api query for orderBy is column
    if (options.orderBy) {
        if (url.length === baseUrl.length) {
            url += `?column=${options.orderBy}`
        } else {
            url += `&column=${options.orderBy}`
        }
    }
    return url
}

// get journeys according to page & limit and optional search keyword (substring of departure / return stations)
// returns journeys with default page and limit if paremeters not provided
export const getJourneys = async (options: JourneyViewOptions):Promise<JourneysData | string> => {
    const journeyUrl = parseUrl(options)
    try {
        const request = await axios.get<JourneysData>(journeyUrl)
        return request.data
    } catch (error:unknown) {
        console.log(error)
        let errorMessage = 'Error while fetching journeys data.'
        if (axios.isAxiosError(error) && error.response) {
            errorMessage = ' Error: ' + error.response.data.error
        }
        return errorMessage
    }
}