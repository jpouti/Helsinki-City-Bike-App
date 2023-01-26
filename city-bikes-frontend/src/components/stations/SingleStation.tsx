import React, { useEffect, useState } from 'react';
import { IStation } from '../../types';
import { useParams } from 'react-router-dom';
import { getSingleStation } from '../../services/stations';
import Container from '@mui/material/Container'

const SingleStation = () => {
    const [station, setStation] = useState<IStation | null>(null)
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
            Single Station
        </Container>
    )
}

export default SingleStation