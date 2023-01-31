import React, { useState, useEffect } from 'react'
import { getJourneys } from '../../services/journeys'
import { JourneysData, JourneyViewOptions } from '../../types'
import JourneyList from './JourneyList'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ErrorMessage from '../ErrorMessage'
import Search from '../Search'

const JourneyView = () => {
    const [journeysData, setJourneysData] = useState<JourneysData | null>()
    const [page, setPage] = useState<number>(0)
    const [limit, setLimit] = useState<number>(5)
    const [search, setSearch] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    
    useEffect(() => {
        const fetchJourneys = async () => {
            const options: JourneyViewOptions = { page, limit, search }
            const response = await getJourneys(options)
            if (typeof response === 'string') {
                setError(response)
            } else {
                setJourneysData(response)
            }
        }
        fetchJourneys()

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

    console.log(journeysData, 'journeys')
    console.log(error, 'error')
    console.log(page, 'page')

    return (
        <Container fixed>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 2 }, justifyContent: { md: 'space-between' }, alignItem: 'center', p: 4 }}>
                <Typography variant='h2'>Journeys</Typography>
                <Search placeholder='Search for journeys' handleSearchChange={handleSearchChange}/>
            </Box>
            <Box>
                {journeysData && <JourneyList journeysData={journeysData} page={page} limit={limit} handlePageChange={handlePageChange} handleLimitChange={handleLimitChange} />}
                { error && <ErrorMessage error={error} />}
            </Box>
        </Container>
    )
}

export default JourneyView
