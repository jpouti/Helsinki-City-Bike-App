import React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import GitHubIcon from '@mui/icons-material/GitHub'

const Footer = () => {
    
    return (
        <Container maxWidth={false} sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 4, marginTop: 4, backgroundColor: '#a1a1aa' }}>
            <Box>
                <Typography>City bike journey data is owned by City Bike Finland</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 2 }, justifyContent: 'space-between' }}>
                <Box>
                    <Typography>HSL city bicycle stations:</Typography>
                    <Link href='https://www.avoindata.fi/data/en/dataset/hsl-n-kaupunkipyoraasemat/resource/a23eef3a-cc40-4608-8aa2-c730d17e8902'>Lisence and information</Link>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2 }}>
                    <Typography>Built by Juho Poutiainen</Typography>
                    <Link href='https://github.com/jpouti/Helsinki-City-Bike-App'>
                        <GitHubIcon />
                    </Link>
                </Box>
            </Box>
        </Container>
    )
}

export default Footer

