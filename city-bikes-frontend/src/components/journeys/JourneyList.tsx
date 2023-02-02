import React from 'react';
import { IJourney, Order } from '../../types';
import TablePaginationActions from '../TablePaginationActions';
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Table from '@mui/material/Table'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import TableSortLabel from '@mui/material/TableSortLabel'
import { visuallyHidden } from '@mui/utils'

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

interface HeadCell {
    id: keyof IJourney
    label: string
}

// Journeys table head cells
const headCells: readonly HeadCell[] = [
    {
        id: 'departure',
        label: 'Departure',
    },
    {
        id: 'return',
        label: 'Return',
    },
    {
        id: 'departureStationName',
        label: 'Departure Station Name',
    },
    {
        id: 'returnStationName',
        label: 'Return Station Name',
    },
    {
        id: 'distance',
        label: 'Distance (km)',
    },
    {
        id: 'duration',
        label: 'Duration (min)',
    },
]

type JourneyListProps = {
    journeysData: {
        journeys: IJourney[]
        count: number
    }
    page: number
    limit: number
    order: Order,
    orderBy: keyof IJourney,
    handlePageChange: (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => void
    handleLimitChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void
    handleRequestSort: (
        event: React.MouseEvent<unknown>,
        property: keyof IJourney,
    ) => void

}

// List of journeys
// TODO ---- xs screeen view
const JourneyList: React.FC<JourneyListProps> = ({ journeysData, page, limit, order, orderBy, handlePageChange, handleLimitChange, handleRequestSort }) => {
    
    if (!journeysData) {
        return null
    }

    const createSortHandler = (property: keyof IJourney) => (event: React.MouseEvent<unknown>) => {
        handleRequestSort(event, property)
    }

    console.log(journeysData, 'journeys data')
    console.log(order, 'order journeyLIst')

    return (
        <Card>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {headCells.map((headCell) => (
                                <TableCell
                                    key={headCell.id}
                                    sortDirection={orderBy === headCell.id ? order : false}
                                >
                                    <TableSortLabel
                                        active={orderBy === headCell.id}
                                        direction={orderBy === headCell.id ? order : 'asc'}
                                        onClick={createSortHandler(headCell.id)}
                                    >
                                        {headCell.label}
                                        {orderBy === headCell.id ? (
                                            <Box component='span' sx={visuallyHidden}>
                                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                            </Box>
                                        ) : null }
                                    </TableSortLabel>

                                </TableCell>
                            ))}
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
