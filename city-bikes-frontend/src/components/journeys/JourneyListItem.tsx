import React from 'react';
import { IJourney } from '../../types';
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

type JourneyItemProps = {
    journey: IJourney
}

// Displaying one journey
const JourneyListItem: React.FC<JourneyItemProps> = ({ journey }) => {
    if (!journey) {
        return null
    }

    // convert time stamp to object with formats date: YYYY-MM-DD, time: HH:mm:ssss
    const convertTimeStamp = (timestamp:Date) => {
        const date = timestamp.toString().split('T')
        const time = date[1].split('.')[0]

        const dateTime = {
            date: date[0],
            time,
        }

        return dateTime
    }

    const departureTime = convertTimeStamp(journey.departure)
    const returnTime = convertTimeStamp(journey.return)

    // convert m to km
    let distance = journey.distance / 1000
    // convert s to min
    let duration = journey.duration / 60

    // round floats to 2 decimal
    distance = parseFloat(distance.toFixed(2))
    duration = parseFloat(duration.toFixed(2))

    return (
        <TableRow>
            <TableCell>{departureTime.date} - {departureTime.time}</TableCell>
            <TableCell>{returnTime.date} - {returnTime.time}</TableCell>
            <TableCell>{journey.departureStationName}</TableCell>
            <TableCell>{journey.returnStationName}</TableCell>
            <TableCell>{distance} km</TableCell>
            <TableCell>{duration} min</TableCell>
        </TableRow>
    )
}

export default JourneyListItem