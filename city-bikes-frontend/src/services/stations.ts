import axios from 'axios'
import { IStation, StationViewOptions } from '../types'

// stations api
const baseUrl = 'http://localhost:3001/api/stations'

// get stations according to page and limit
// returns stations with default page and limit if paremeters not provided
export const getStations = async (options: StationViewOptions):Promise<IStation[] | string> => {
    try {
        // journeys with default options
        if (!options.page && !options.limit) {
            const request = await axios.get<IStation[]>(baseUrl)
            return request.data
        // journeys with default page and provided limit
        } else if (!options.page && options.limit) {
            const request = await axios.get<IStation[]>(`${baseUrl}?limit=${options.limit}`)
            return request.data
        // journeys with provided page and limit
        } else if (options.page && options.limit) {
            const request = await axios.get<IStation[]>(`${baseUrl}?page=${options.page}&limit=${options.limit}`)
            return request.data
        }
    } catch (error:unknown) {
        let errorMessage = 'Error while fetching stations data.'
        if (axios.isAxiosError(error) && error.response) {
            errorMessage = ' Error: ' + error.response.data.message
        }
        return errorMessage
    }

    return 'Error while fetching stations data.'
}

/*
// get single station according to station id
export const getSingleStation = async (id: number):Promise<IStation | string> => {

}
*/