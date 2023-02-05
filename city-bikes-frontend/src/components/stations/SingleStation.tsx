import React, { useEffect, useState } from 'react';
import { StationInfo } from '../../types';
import { useParams } from 'react-router-dom';
import { getSingleStation } from '../../services/stations';
import Map from '../Map';
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ErrorMessage from '../ErrorMessage';
import PlaceIcon from '@mui/icons-material/Place'
import PedalBikeIcon from '@mui/icons-material/PedalBike'
import StartIcon from '@mui/icons-material/Start'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const styles = {
    flexBox: {
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-around',
        gap: 2,
        padding: 2,
    },
    statisticsCard: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 2,
        alignItems: 'center',
        gap: 2,
        border: '1px solid #90caf9', // mui default primary color (~blue)
        borderRadius: 3,
    },
}

const SingleStation = () => {
    const [station, setStation] = useState<StationInfo | null>(null)
    const [error, setError] = useState<string | null>(null)
    
    const { id } = useParams()

    useEffect(() => {
        const fetchStation = async () => {
            if (!id) {
                setError('Error, no id provided')
                return
            }
            const response = await getSingleStation(Number(id))
            if (typeof response === 'string') {
                setError(response)
            } else {
                setStation(response)
            }
        }
        fetchStation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Container>
            {station && 
            <Card>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ paddingY: { xs: 2, md: 4 }, paddingX: 2 }}>
                        <Typography variant='h4'>{station.name}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <PlaceIcon color='primary' />
                            <Typography variant='h6'>{station.osoite}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ padding: 2 }}>
                        <Typography variant='h6'>{station.name} statistics:</Typography>
                    </Box>
                    <Box sx={ styles.flexBox }>
                        <Card sx={ styles.statisticsCard }>
                            <PedalBikeIcon color='primary'/>
                            <Typography fontWeight={'bold'}>Station capacity: </Typography>
                            <Typography fontWeight={'bold'}>{station.kapasiteetti}</Typography>
                        </Card>
                        <Card sx={ styles.statisticsCard }>
                            <StartIcon color='primary'/>
                            <Typography fontWeight={'bold'}>Journeys starting from {station.name}: </Typography>
                            <Typography fontWeight={'bold'}>{station.n_departures}</Typography>
                        </Card>
                        <Card sx={ styles.statisticsCard }>
                            <ArrowBackIcon color='primary' />
                            <Typography fontWeight={'bold'}>Journeys ending to {station.name}:  </Typography>
                            <Typography fontWeight={'bold'}>{station.n_returns}</Typography>
                        </Card>
                    </Box>
                </Box>
                <Box sx={{ marginBottom: 10, marginTop: 4, paddingX: 2 }}>
                    <Typography variant='h6'>{station.name} location: </Typography>
                    <Map position={[station.yCoord, station.xCoord]} marker={[station.yCoord, station.xCoord]} popUp={['Station: ' + station.name, 'Address: ' + station.osoite]} />
                </Box>
            </Card>
            }
            {error && <ErrorMessage error={error} />}
        </Container>
    )
}

export default SingleStation