import React from 'react';
import { IJourney } from '../../types';
import TablePaginationActions from '../TablePaginationActions';
import Card from '@mui/material/Card'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Table from '@mui/material/Table'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'

type JourneyItemProps = {
    journey: IJourney
}

// Displaying one journey
const JourneyItem: React.FC<JourneyItemProps> = ({ journey }) => {
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

type JourneyListProps = {
    journeysData: {
        journeys: IJourney[]
        count: number
    }
    page: number
    limit: number
    handlePageChange: (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => void
    handleLimitChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void

}

// List of journeys
// TODO ---- xs screeen view
const JourneyList: React.FC<JourneyListProps> = ({ journeysData, page, limit, handlePageChange, handleLimitChange }) => {

    if (!journeysData) {
        return null
    }

    console.log(journeysData, 'journeys data')

    return (
        <Card>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Departure</TableCell>
                            <TableCell>Return</TableCell>
                            <TableCell>Departure Station Name</TableCell>
                            <TableCell>Return Station Name</TableCell>
                            <TableCell>Distance (km)</TableCell>
                            <TableCell>Duration (min)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {journeysData.journeys.map((journey, index) => {
                            return <JourneyItem journey={journey} key={index} />
                        })}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                count={journeysData.count}
                                rowsPerPage={limit}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'Rows per page',
                                    },
                                    native: true,
                                }}
                                onPageChange={handlePageChange}
                                onRowsPerPageChange={handleLimitChange}
                                ActionsComponent={TablePaginationActions}
                            />
                                
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Card>
    )
}

export default JourneyList
