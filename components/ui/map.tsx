"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

interface MapProps {
  posix: LatLngExpression;
  zoom?: number;
}

const defaults = {
  zoom: 13,
};

const Map = ({ posix, zoom = defaults.zoom }: MapProps) => {
  return (
    <MapContainer
      center={posix}
      zoom={zoom}
      scrollWheelZoom={true}
      className="h-full w-full" // Tailwind handles the sizing
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={posix}>
        <Popup>
          <div className="text-sm font-sans">
            <p className="font-bold">Active Station</p>
            <p className="text-slate-500">Device #882-Alpha</p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;

