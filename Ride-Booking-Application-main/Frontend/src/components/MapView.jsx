import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../utils/fix-leaflet-icons';
import L from 'leaflet';
import uberLogo from '../assets/pin.png';

const MapView = ({ location }) => {
    const [center, setCenter] = useState(null);
    // console.log(location)

    useEffect(() => {
        if (location) {
            setCenter([location.ltd, location.lng]);
        }
    }, [location]);

    if (!center) return null;

    const customIcon = new L.Icon({
        iconUrl: uberLogo,
        iconSize: [20, 30],
    });

    return (
        <MapContainer center={center} zoom={50} style={{ height: "100vh", width: "100%" }}>
            <TileLayer
                attribution='© <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={center} icon={customIcon}>
                <Popup>
                    You are here
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default MapView;
