import React, { useEffect, useState } from "react";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useWeather } from "../hooks/useWeather";
import { motion } from "framer-motion";

const CustomMap = () => {
  const { lat, lon, weatherData, getWeather } = useWeather();
  const [mapCenter, setMapCenter] = useState([lat, lon]);

  useEffect(() => {
    setMapCenter([lat, lon]);
  }, [lat, lon]);

  function ChangeMapView({ center }) {
    const map = useMap();
    useEffect(() => {
      map.setView(center);
    }, [map, center]);
    return null;
  }

  function LocationMarker() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setMapCenter([lat, lng]);
        getWeather({ lat, lon: lng });
      },
    });
    return null;
  }

  const iconUrl = weatherData ? `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png` : "";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full rounded-2xl shadow-lg overflow-hidden"
    >
      <MapContainer
        className="rounded-2xl"
        center={mapCenter}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <ChangeMapView center={mapCenter} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {weatherData && (
          <Marker position={mapCenter} icon={new L.Icon({
            iconUrl,
            iconSize: [50, 50],
            iconAnchor: [25, 50],
            popupAnchor: [0, -50]
          })}>
            <Popup>
              <div className="flex flex-col text-xl ">
                {weatherData.name || "No Data"}, {weatherData.sys?.country || "No Data"}
                <br />
                <span className="flex text-base">
                  {weatherData.weather[0].description}
                  <img src={iconUrl} className="w-8" alt="weather icon" />
                </span>
              </div>
            </Popup>
          </Marker>
        )}
        <LocationMarker />
      </MapContainer>
    </motion.div>
  );
};

export default CustomMap;