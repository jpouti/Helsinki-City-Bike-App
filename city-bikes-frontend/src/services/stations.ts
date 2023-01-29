import axios from 'axios'
import { StationsData, StationInfo, StationViewOptions } from '../types'

// stations api
const baseUrl = 'http://localhost:3001/api/stations'

// get stations according to page and limit
// returns stations with default page and limit if paremeters not provided
export const getStations = async (options: StationViewOptions):Promise<StationsData | string> => {
    try {
        // stations with default options
        if (!options.page && !options.limit) {
            const request = await axios.get<StationsData>(baseUrl)
            return request.data
        // stations with default page and provided limit
        } else if (!options.page && options.limit) {
            const request = await axios.get<StationsData>(`${baseUrl}?limit=${options.limit}`)
            return request.data
        // stations with provided page and limit
        } else if (options.page && options.limit) {
            const request = await axios.get<StationsData>(`${baseUrl}?page=${options.page}&limit=${options.limit}`)
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


// get single station according to station id
export const getSingleStation = async (id: number):Promise<StationInfo | string> => {
    try {
        const request = await axios.get<StationInfo>(`${baseUrl}/${id}`)
        return request.data
    } catch (error:unknown) {
        let errorMessage = 'Error while fetching single station data.'
        if (axios.isAxiosError(error) && error.response) {
            errorMessage = ' Error: ' + error.response.data.message
        }
        return errorMessage
    }
}