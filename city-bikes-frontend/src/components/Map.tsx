import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import { Icon } from 'leaflet'

import 'leaflet/dist/leaflet.css'

const Map = () => {

    return (
        <div>
            <h3>Map</h3>
            <div id='map'>
                <MapContainer center={[60.16582, 24.840319]} zoom={13} scrollWheelZoom={false} style={{ height: '50vh', width: '50vw' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[60.16582, 24.840319]} icon={new Icon({ iconUrl: markerIcon, iconSize: [25, 41], iconAnchor: [12, 41] })}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    )
}

export default Map