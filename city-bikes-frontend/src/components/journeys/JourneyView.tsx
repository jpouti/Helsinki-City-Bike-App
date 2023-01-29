import React, { useState, useEffect } from 'react'
import { getJourneys } from '../../services/journeys'
import { JourneysData, JourneyViewOptions } from '../../types'
import JourneyList from './JourneyList'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const JourneyView = () => {
    const [journeysData, setJourneysData] = useState<JourneysData | null>()
    const [page, setPage] = useState<number>(0)
    const [limit, setLimit] = useState<number>(5)
    const [error, setError] = useState<string | null>(null)
    
    useEffect(() => {
        const fetchJourneys = async () => {
            const options: JourneyViewOptions = { page, limit }
            const response = await getJourneys(options)
            if (typeof response === 'string') {
                setError(response)
            } else {
                setJourneysData(response)
            }
        }
        fetchJourneys()

    }, [page, limit])

    // handle page change
    const handlePageChange = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage)
    }


    // handle limit change -> limit change will start from first page
    const handleLimitChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setLimit(parseInt(event.target.value))
        setPage(0)
    }

    console.log(journeysData, 'journeys')
    console.log(error, 'error')
    console.log(page, 'page')

    return (
        <Container fixed>
            <Typography variant='h2'>Journeys</Typography>
            <Box>
                {journeysData && <JourneyList journeysData={journeysData} page={page} limit={limit} handlePageChange={handlePageChange} handleLimitChange={handleLimitChange} />}
                { error && <div>Error: {error}</div> }
            </Box>
        </Container>
    )
}

export default JourneyView
