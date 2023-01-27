import React, { useEffect, useState } from 'react';
import { StationInfo } from '../../types';
import { useParams } from 'react-router-dom';
import { getSingleStation } from '../../services/stations';
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const styles = {
    flexBox: {
        display: 'flex',
        gap: 10,
        padding: 2,
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

    console.log(station, 'single station')
    console.log(error, 'error')


    return (
        <Container>
            {station && 
            <Card>
                <Typography variant='h4'>{station.name}</Typography>
                <Card>
                    <Box sx={ styles.flexBox }>
                        <Typography>Station address: </Typography>
                        <Typography>{station.osoite}</Typography>
                    </Box>
                    <Box sx={ styles.flexBox }>
                        <Typography>Station capacity: </Typography>
                        <Typography>{station.kapasiteetti}</Typography>
                    </Box>
                    <Box sx={ styles.flexBox }>
                        <Typography>Journeys starting from {station.name}: </Typography>
                        <Typography>{station.n_departures}</Typography>
                    </Box>
                    <Box sx={ styles.flexBox }>
                        <Typography>Journeys starting from {station.name}:  </Typography>
                        <Typography>{station.n_returns}</Typography>
                    </Box>
                </Card>
            </Card>
            }
        </Container>
    )
}

export default SingleStation