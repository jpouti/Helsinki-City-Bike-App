import React, { useState, useEffect } from 'react'
import { getJourneys } from '../../services/journeys'
import { IJourney, JourneyViewOptions } from '../../types'

/* eslint-disable @typescript-eslint/no-unused-vars */
// -> add functionality for page and limit
const JourneyView = () => {
    const [journeys, setJourneys] = useState<IJourney[]>([])
    const [page, setPage] = useState<number | null>(null)
    const [limit, setLimit] = useState<number | null>(3) // change the default
    const [error, setError] = useState<string | null>(null)
    
    useEffect(() => {
        const fetchJourneys = async () => {
            const options: JourneyViewOptions = { page, limit }
            const response = await getJourneys(options)
            if (typeof response === 'string') {
                setError(response)
            } else {
                setJourneys(response)
            }
        }
        fetchJourneys()

    }, [page, limit])

    console.log(journeys)
    console.log(error)

    return (
        <div>
            <h1>Journeys</h1>
        </div>
    )
}

export default JourneyView
