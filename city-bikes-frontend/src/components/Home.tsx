import Map from './Map';
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike'
import ExploreIcon from '@mui/icons-material/Explore'

const styles = {
    flexRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        paddingLeft: 4,
    },
    flexCol: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        paddingY: 2,
    },
}

const Home = () => {
    return (
        <Card sx={{ p: 2 }}>
            <Box sx={ styles.flexCol }>
                <Typography variant='h3'>Helsinki City Bikes</Typography>
                <Typography variant='h6' fontWeight={'bold'}>Explore Helsinki Capital area city bikes journeys and stations data</Typography>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: { xs: 'flex-start', md: 'space-evenly' }, gap: { xs: 0, md: 2, lg: 20 } }}>
                    <Box sx={ styles.flexCol}>
                        <Typography>Explore data from journeys made with city bikes and plan your next biking route:</Typography>
                        <Box sx={ styles.flexRow }>
                            <DirectionsBikeIcon color='primary' />
                            <Link to={'journeys'} id='journeys-link' style={{ textDecoration: 'none' }} >
                                <Typography color='primary' fontWeight={'bold'} sx={{ paddingRight: 4 }}>Journeys</Typography>
                            </Link>
                        </Box>
                    </Box>
                    <Box sx={ styles.flexCol}>
                        <Typography>Check where you can find city bike for your next trip:</Typography>
                        <Box sx={ styles.flexRow }>
                            <ExploreIcon color='primary' />
                            <Link to={'stations'} style={{ textDecoration: 'none' }}>
                                <Typography color='primary' fontWeight={'bold'} sx={{ paddingRight: 4 }}>Stations</Typography>
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Map position={[60.2, 24.9]} zoom={11} />
        </Card>
    )
}

export default Home