import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet"; 

const GeoapifyMap = () => {
  const apiKey = "68cafeb459b141ce90cb723c21a5e881";
  const tileLayerUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey=${apiKey}`;
  const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | &copy; <a href="https://www.geoapify.com/">Geoapify</a>';

  
  const icon = new L.Icon({
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    
    iconSize: [25, 41], 
    iconAnchor: [12, 41], 
    popupAnchor: [1, -34], 
  });

  return (
    <MapContainer
      center={[30.033333, 31.233334]} // Cairo, Egypt coordinates
      zoom={12}
      style={{ height: "20rem", width: "100%", background: "transparent" }}
    >
      <TileLayer url={tileLayerUrl} />

      {/* Add a marker with a popup */}
      <Marker position={[30.033333, 31.233334]} icon={icon}>
        <Popup>Company's Location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default GeoapifyMap;
