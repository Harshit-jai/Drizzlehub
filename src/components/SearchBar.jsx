import React, { useState, useEffect } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdMyLocation } from "react-icons/md";
import { useWeather } from "../hooks/useWeather";

const SearchBar = () => {
  const [place, setPlace] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { getWeather } = useWeather();
  const handleClick = () => {
    if (place.trim()) {
      getWeather(place);
      setPlace("");
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getWeather({ lat: latitude, lon: longitude });
        },
        (error) => {
          let localErrorMessage = "An unknown error occurred.";
          switch (error.code) {
            case error.PERMISSION_DENIED:
              localErrorMessage = "Please enable location access.";
              break;
            case error.POSITION_UNAVAILABLE:
              localErrorMessage = "Location information is unavailable.";
              break;
            case error.TIMEOUT:
              localErrorMessage = "Location request timed out.";
              break;
            default:
              localErrorMessage =
                "An error occurred while fetching the location.";
              break;
          }
          setErrorMessage(localErrorMessage);
        },
        { maximumAge: 10000, timeout: 5000, enableHighAccuracy: true }
      );
    } else {
      setErrorMessage("Geolocation is not supported by your browser.");
    }
  };

  useEffect(() => {
    if(errorMessage)
    {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  },[errorMessage])

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1">
        <input
          className=" w-48 rounded-full pt-1 px-4 border-2 border-black text-xl placeholder:text-gray-600"
          placeholder="Search for places..."
          type="text"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleClick();
            }
          }}
        />
        <button onClick={handleClick}>
          <FaMagnifyingGlass className="text-2xl" />
        </button>
        <button onClick={handleLocationClick}>
          <MdMyLocation className="text-3xl" />
        </button>
      </div>
      {errorMessage && (
        <div className="bg-red-200 text-red-800 px-2 py-0.5 mt-1 rounded-md border border-red-200 leading-5">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
