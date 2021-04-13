
import React from 'react'
import { MapContainer as LeafletMap,TileLayer} from "react-leaflet"
import ChangeView from './ChangeView'
import './Map.css'
import { showDataOnMap } from './util'

function Map({countries ,center ,zoom ,darkMode,...props}) {

    return (
        <div className ={`map ${darkMode && 'map_dark'}`}>
            <LeafletMap center={center} zoom={zoom} scrollWheelZoom = {false}>
            <ChangeView center={center} zoom={zoom} /> 
            <TileLayer
               attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {showDataOnMap(countries , props.casesType)}
            </LeafletMap>
        </div>
    )
}

export default Map
