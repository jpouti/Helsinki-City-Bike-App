import React, { useState, useEffect } from 'react'
import { getStations } from '../../services/stations'
import { StationsData, StationViewOptions } from '../../types'
import Search from '../Search'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import StationsList from './StationsList'
import ErrorMessage from '../ErrorMessage'

const StationsView = () => {
    const [stationsData, setStationsData] = useState<StationsData | null>()
    const [page, setPage] = useState<number>(0)
    const [limit, setLimit] = useState<number>(5)
    const [search, setSearch] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    
    useEffect(() => {
        const fetchStations = async () => {
            const options: StationViewOptions = { page, limit, search }
            const response = await getStations(options)
            if (typeof response === 'string') {
                setError(response)
            } else {
                setStationsData(response)
            }
        }
        fetchStations()

    }, [page, limit, search])

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

    const handleSearchChange = (
        newSearch: string | null,
    ) => {
        console.log(newSearch, 'search')
        setSearch(newSearch)
    }

    console.log(stationsData, 'stations')
    console.log(error, 'error')

    return (
        <Container fixed>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 2 }, justifyContent: { md: 'space-between' }, alignItem: 'center', p: 4 }}>
                <Typography variant='h2'>Stations</Typography>
                <Search placeholder='Search for stations' handleSearchChange={handleSearchChange}/>
            </Box>
            
            <Box>
                {stationsData && <StationsList stationsData={stationsData} page={page} limit={limit} handlePageChange={handlePageChange} handleLimitChange={handleLimitChange} />}
                { error && <ErrorMessage error={error} /> }
            </Box>
        </Container>
    )
}

export default StationsView