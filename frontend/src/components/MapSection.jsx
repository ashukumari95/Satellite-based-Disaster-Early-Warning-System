import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Icon fix (This code is correct)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/images/marker-icon-2x.png',
    iconUrl: '/images/marker-icon.png',
    shadowUrl: '/images/shadow.png',
});

const MapSection = ({ warnings }) => {
  const hasWarnings = Array.isArray(warnings) && warnings.length > 0;
  const firstWarning = hasWarnings ? warnings[0] : null;

  // --- THE FIX ---
  // Add a check to ensure we have valid latitude and longitude.
  // If not, we display the default map of India instead of crashing.
  if (!firstWarning || firstWarning.lat == null || firstWarning.lon == null) {
    return (
      <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    );
  }

  // If we have valid coordinates, proceed to render the specific map
  const position = [firstWarning.lat, firstWarning.lon];
  const mapKey = `${firstWarning.lat}-${firstWarning.lon}`;

  return (
    <MapContainer key={mapKey} center={position} zoom={13} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {warnings.map((warning, index) => (
        <Marker key={index} position={[warning.lat, warning.lon]}>
          <Popup>
            <b>{warning.name}</b><br />
            Temperature: {warning.temp}°C <br />
            Condition: {warning.condition}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapSection;