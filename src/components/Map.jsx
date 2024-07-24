import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useWeather } from "../hooks/useWeather";

function Map() {
  const { lat, lon, weatherData, getWeather } = useWeather();
  const { name, sys, weather } = weatherData;
  const [mapCenter, setMapCenter] = useState([lat, lon]);
  const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  function ChangeMapView({ center }) {
    const map = useMap();
    useEffect(() => {
      map.setView(center);
    }, [map, center]);
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
  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <MapContainer
      className="rounded-2xl"
      center={[lat, lon]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <ChangeMapView center={mapCenter} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[lat, lon]}>
        <Popup>
          <div className="flex flex-col text-xl ">
            {weatherData?.name || "No Data"},{" "}
            {weatherData?.sys.country || "No Data"}
            <br />
            <span className="flex text-base">
              {capitalize(weather[0].description)}{" "}
              <img src={iconUrl} className="w-8" />
            </span>
          </div>
        </Popup>
      </Marker>
      <LocationMarker />
    </MapContainer>
  );
}

export default Map;
