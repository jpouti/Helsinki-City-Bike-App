import React from 'react';
import { useNavigate } from 'react-router-dom'
import { IStation, StationsData } from '../../types';
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

type StationItemProps = {
    station: IStation
}

// Displaying a station in StationsList
const StationItem: React.FC<StationItemProps> = ({ station }) => {
    const navigate = useNavigate()
    if (!station) {
        return <TableRow><TableCell>null</TableCell></TableRow>
    }

    // navigate to Single Station view
    const navigateToSingleStation = () => {
        console.log(`navigating to view ${station.id}`)
        navigate(`/stations/${station.id}`)
    }

    return (
        <TableRow hover={true} onClick={() => navigateToSingleStation()}>
            <TableCell>{station.name}</TableCell>
            <TableCell>{station.osoite}</TableCell>
            <TableCell>{station.kapasiteetti}</TableCell>
        </TableRow>
    )
}

type StationListProps = {
    stationsData: StationsData
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

// List of stations
// TODO ---- xs screeen view
const StationsList: React.FC<StationListProps> = ({ stationsData, page, limit, handlePageChange, handleLimitChange }) => {
    console.log(stationsData, 'stations data')

    if (!stationsData) {
        return null
    }

    return (
        <Card>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Capacity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stationsData.stations.map((station, index) => {
                            return <StationItem station={station} key={index} />
                        })}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                count={stationsData.count}
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

export default StationsList
