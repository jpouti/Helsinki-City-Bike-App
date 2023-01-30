import React from 'react'
import { Link } from 'react-router-dom'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const NotFound = () => {
    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center', p: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                <Typography variant='h3' color={'red'}>404</Typography>
                <Typography variant='h4'>Oops! Current page doesn't seem to exist.</Typography>
                <Typography variant='h4'>Please check links below to get you back to the app: </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 4, md: 12 } }}>
                <Link to={'/'}>
                    <Typography variant='h4'>Home</Typography>
                </Link>
                <Link to={'/journeys'}>
                    <Typography variant='h4'>Journeys</Typography>
                </Link>
                <Link to={'/stations'}>
                    <Typography variant='h4'>Stations</Typography>
                </Link>
            </Box>
        </Container>
    )
}

export default NotFound