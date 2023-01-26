import React, { useState, useEffect } from 'react'
import { getStations } from '../../services/stations'
import { IStation, StationViewOptions } from '../../types'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import StationsList from './StationsList'

/* eslint-disable @typescript-eslint/no-unused-vars */
// -> add functionality for page and limit
const StationsView = () => {
    const [stations, setStations] = useState<IStation[]>([])
    const [page, setPage] = useState<number | null>(null)
    const [limit, setLimit] = useState<number | null>(3) // change the default
    const [error, setError] = useState<string | null>(null)
    
    useEffect(() => {
        const fetchStations = async () => {
            const options: StationViewOptions = { page, limit }
            const response = await getStations(options)
            if (typeof response === 'string') {
                setError(response)
            } else {
                setStations(response)
            }
        }
        fetchStations()

    }, [page, limit])

    console.log(stations, 'stations')
    console.log(error, 'error')

    return (
        <Container fixed>
            <Typography variant='h2'>Stations</Typography>
            <Box>
                <StationsList stations={stations} />
                <Box>
                    { error && <div>Error: {error}</div> }
                </Box>
            </Box>
        </Container>
    )
}

export default StationsView