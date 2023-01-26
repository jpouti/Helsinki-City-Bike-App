import React from 'react';
import { IStation } from '../../types';
import Card from '@mui/material/Card'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

type StationItemProps = {
    station: IStation
}

// Displaying a station in StationsList
const JourneyItem: React.FC<StationItemProps> = ({ station }) => {
    if (!station) {
        return <TableRow><TableCell>null</TableCell></TableRow>
    }

    return (
        <TableRow>
            <TableCell>{station.name}</TableCell>
            <TableCell>{station.osoite}</TableCell>
            <TableCell>{station.kapasiteetti}</TableCell>
        </TableRow>
    )
}

type StationListProps = {
    stations: IStation[]
}

// List of stations
// TODO ---- xs screeen view
const StationsList: React.FC<StationListProps> = ({ stations }) => {
    console.log(stations, 'stationslist')

    if (!stations) {
        return null
    }

    return (
        <Card>
            <TableContainer>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Capacity</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stations.map((station, index) => {
                        return <JourneyItem station={station} key={index} />
                    })}
                </TableBody>
            </TableContainer>
        </Card>
    )
}

export default StationsList
