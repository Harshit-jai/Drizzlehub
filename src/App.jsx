import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import Weather from "./components/Weather";
import Forecast from "./components/Forecast";
import Highlights from "./components/Highlights";
import SocialLinks from "./components/SocialLinks";
import { useWeather } from "./hooks/useWeather";
const API_KEY = import.meta.env.VITE_API_KEY;

const App = () => {
  const [modalOpen, setModalOpen] = useState(true);
  const { getWeather } = useWeather();
  const [error, setError] = useState("");
  const [input, setInput] = useState("");

  const fetchCoordinates = async (place) => {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${place}&limit=1&appid=${API_KEY}`
    );
    const data = await response.json();
    return data[0];
  };

  const handleClick = async () => {
    if (input.trim().length < 3) {
      setError("Enter at least 3 characters.");
      return;
    }
    setError("");

    const coordinates = await fetchCoordinates(input);

    if (coordinates) {
      getWeather(input);
      setModalOpen(false);
    } else {
      setError("Enter a valid place");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-blue-900 text-black text-black dark:text-white" style={{
      backgroundImage: "url('https://t4.ftcdn.net/jpg/03/66/34/55/240_F_366345513_hF5Kut4wF9GWYyE8IAB3VsbTcEbgfS7D.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat"
    }}>
      <div className="bg-white bg-opacity-40 dark:bg-gray-900 dark:bg-opacity-20 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-full max-w-6xl flex flex-col lg:flex-row gap-8 border border-white/20">
        {/* Left Panel */}
        <div className="lg:w-1/3 p-6 bg-white bg-opacity-50 dark:bg-gray-800 dark:bg-opacity-25 backdrop-blur-lg rounded-xl shadow-lg flex flex-col items-center text-center">
          <SearchBar />
          <Weather />
          <SocialLinks />
        </div>

        {/* Right Panel */}
        <div className="lg:w-2/3 p-6 bg-white bg-opacity-25 backdrop-blur-lg rounded-xl shadow-lg flex flex-col gap-y-6">
          <Forecast />
          <Highlights />
        </div>
      </div>
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl text-center w-96">
            <h2 className="text-2xl mb-3 dark:text-white font-semibold">Enter a location:</h2>
            <input
              type="text"
              value={input}
              minLength={3}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="border p-3 w-full mb-3 text-lg rounded-lg outline-none placeholder:text-lg bg-gray-100 dark:bg-gray-700 dark:text-white"
              placeholder="Type a city..."
            />
            <button
              onClick={handleClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-lg w-full transition duration-300"
            >
              Submit
            </button>
            {error && <p className="text-red-500 mt-3 font-medium">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
