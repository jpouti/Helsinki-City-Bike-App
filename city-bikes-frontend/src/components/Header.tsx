import React from 'react';
import { Link } from 'react-router-dom'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'


const Header = () => {
    return (
        <Container maxWidth={false} sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 4, md: 20, lg: 40 }, p: 4, backgroundColor: '#a1a1aa' }}>
            <Box>
                <Typography variant='h5'>Helsinki City Bikes</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 6, md: 12 } }}>
                <Link to={'/'}>
                    <Typography variant='h5'>Home</Typography>
                </Link>
                <Link to={'journeys'}>
                    <Typography variant='h5'>Journeys</Typography>
                </Link>    
                <Link to={'stations'}>
                    <Typography variant='h5'>Stations</Typography>
                </Link>
            </Box>
        </Container>
    )
}

export default Header