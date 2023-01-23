import axios from 'axios'
import { IJourney, JourneyViewOptions } from '../types'

// journeys api
const baseUrl = 'http://localhost:3001/api/journeys'

// get journeys according to page and limit
// returns journeys with default page and limit if paremeters not provided
export const getJourneys = async (options: JourneyViewOptions):Promise<IJourney[] | string> => {
    try {
        // journeys with default options
        if (!options.page && !options.limit) {
            const request = await axios.get<IJourney[]>(baseUrl)
            return request.data
        // journeys with default page and provided limit
        } else if (!options.page && options.limit) {
            const request = await axios.get<IJourney[]>(`${baseUrl}?limit=${options.limit}`)
            return request.data
        // journeys with provided page and limit
        } else if (options.page && options.limit) {
            const request = await axios.get<IJourney[]>(`${baseUrl}?page=${options.page}&limit=${options.limit}`)
            return request.data
        }
    } catch (error:unknown) {
        let errorMessage = 'Error while fetching journeys data.'
        if (axios.isAxiosError(error) && error.response) {
            errorMessage = ' Error: ' + error.response.data.message
        }
        return errorMessage
    }

    return 'Error while fetching journeys data.'
}