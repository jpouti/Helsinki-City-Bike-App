import axios from 'axios'
import { IJourney, JourneyViewOptions } from '../types'

// journeys api
const baseUrl = 'http://localhost:3001/api/journeys'

// get journeys according to page and limit
// returns journeys with default page and limit if paremeters not provided
export default async function getJourneys(options: JourneyViewOptions) {
    if (!options.page && !options.limit) {
        const request = await axios.get<IJourney[]>(baseUrl)
        return request.data
    } else if (!options.page && options.limit) {
        const request = await axios.get<IJourney[]>(`${baseUrl}?limit=${options.limit}`)
        return request.data
    } else if (options.page && options.limit) {
        const request = await axios.get<IJourney[]>(`${baseUrl}?page=${options.page}&limit=${options.limit}`)
        return request.data
    }
}