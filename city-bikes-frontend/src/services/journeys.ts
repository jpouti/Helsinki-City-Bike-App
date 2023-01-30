import axios from 'axios'
import { JourneysData, JourneyViewOptions } from '../types'

// journeys api
const baseUrl = 'http://localhost:3001/api/journeys'

// get journeys according to page and limit
// returns journeys with default page and limit if paremeters not provided
export const getJourneys = async (options: JourneyViewOptions):Promise<JourneysData | string> => {
    try {
        // journeys with default options
        if (!options.page && !options.limit) {
            const request = await axios.get<JourneysData>(baseUrl)
            return request.data
        // journeys with default page and provided limit
        } else if (!options.page && options.limit) {
            const request = await axios.get<JourneysData>(`${baseUrl}?limit=${options.limit}`)
            return request.data
        // journeys with provided page and limit
        } else if (options.page && options.limit) {
            const request = await axios.get<JourneysData>(`${baseUrl}?page=${options.page}&limit=${options.limit}`)
            return request.data
        }
    } catch (error:unknown) {
        console.log(error)
        let errorMessage = 'Error while fetching journeys data.'
        if (axios.isAxiosError(error) && error.response) {
            errorMessage = ' Error: ' + error.response.data.error
        }
        return errorMessage
    }

    return 'Error while fetching journeys data.'
}