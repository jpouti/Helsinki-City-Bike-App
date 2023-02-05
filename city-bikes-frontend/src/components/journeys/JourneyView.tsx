import React, { useState, useEffect } from 'react'
import { getJourneys } from '../../services/journeys'
import { JourneysData, JourneyViewOptions, Order, IJourney } from '../../types'
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
    const [order, setOrder] = useState<Order>('desc')
    const [orderBy, setOrderBy] = useState<keyof IJourney>('return')
    const [error, setError] = useState<string | null>(null)
    
    useEffect(() => {
        const fetchJourneys = async () => {
            const options: JourneyViewOptions = { page, limit, search, order, orderBy }
            const response = await getJourneys(options)
            if (typeof response === 'string') {
                setError(response)
            } else {
                setJourneysData(response)
            }
        }
        fetchJourneys()
    }, [page, limit, search, orderBy, order])

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
        setSearch(newSearch)
    }

    // handle order & sorting 
    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof IJourney,
    ) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    return (
        <Container fixed>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 2 }, justifyContent: { md: 'space-between' }, alignItem: 'center', p: 4 }}>
                <Typography variant='h2'>Journeys</Typography>
                <Search placeholder='Search for journeys' handleSearchChange={handleSearchChange}/>
            </Box>
            <Box>
                {journeysData && <JourneyList journeysData={journeysData} page={page} limit={limit} handlePageChange={handlePageChange} handleLimitChange={handleLimitChange} handleRequestSort={handleRequestSort} order={order} orderBy={orderBy} />}
                { error && <ErrorMessage error={error} />}
            </Box>
        </Container>
    )
}

export default JourneyView
