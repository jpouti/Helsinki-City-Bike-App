import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import { Icon, LatLngExpression } from 'leaflet'

import 'leaflet/dist/leaflet.css'

type MapProps = {
    position: LatLngExpression // [y coordinates, x coordinates]
    popUp?: string[]
    marker?: LatLngExpression
    zoom?: number
}


// create map focused and marked on the given coordinates
const Map:React.FC<MapProps> = ({ position, popUp, marker, zoom }) => {
    
    // default zoom for map 13
    const size = zoom ? zoom : 13

    return (
        <div>
            <div id='map'>
                <MapContainer center={position} zoom={size} scrollWheelZoom={false} style={{ height: '50vh', width: '100%' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {marker && <Marker position={marker} icon={new Icon({ iconUrl: markerIcon, iconSize: [25, 41], iconAnchor: [12, 41] })}>
                        {popUp && <Popup>
                            {popUp[0]} <br /> {popUp[1]}
                        </Popup>}
                    </Marker>}
                </MapContainer>
            </div>
        </div>
    )
}

export default Map