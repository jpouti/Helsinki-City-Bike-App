import React from 'react';
import { IJourney, Order } from '../../types';
import TablePaginationActions from '../TablePaginationActions';
import JourneyListItem from './JourneyListItem';
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
import { Typography } from '@mui/material';

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
    
    // display message when no journeys found
    if (journeysData.journeys.length < 1) {
        return (
            <Card sx={{ p: 2 }}>
                <Typography variant='h4' color='red'>Could not find any journeys with current search</Typography>
            </Card>
        )
    }

    const createSortHandler = (property: keyof IJourney) => (event: React.MouseEvent<unknown>) => {
        handleRequestSort(event, property)
    }

    console.log(journeysData, 'journeys data')
    console.log(order, 'order journeyLIst')

    return (
        <Card>
            <TableContainer id='journeys-table'>
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
                                        id={`${headCell.id}-btn`}
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
                            return <JourneyListItem journey={journey} key={index} />
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
