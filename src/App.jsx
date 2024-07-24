import React from "react";
import { WeatherProvider } from "./context/WeatherContext";
import SearchBar from "./components/SearchBar";
import Weather from "./components/Weather";
import Forecast from "./components/Forecast";
import Highlights from "./components/Highlights";
import SocialLinks from "./components/SocialLinks";

const App = () => {
  return (
    <WeatherProvider>
      <div className="">
        <div className="flex bg-slate-400 px-20 py-4 min-h-screen">
          <div className="flex flex-col w-1/4 px-10 py-6 bg-white rounded-l-3xl shadow-xl z-50">
            <div className="h-12">
              <SearchBar />
            </div>
            <div className="h-full">
              <Weather />
            </div>
            <div className="h-24">
              <SocialLinks />
            </div>
          </div>
          <div className="bg-slate-200 w-3/4 py-6 px-10 rounded-r-3xl flex flex-col gap-y-8">
            <div className="h-1/3 ">
              <Forecast />
            </div>
            <div className="h-2/3">
              <Highlights />
            </div>
          </div>
        </div>
      </div>
    </WeatherProvider>
  );
};

export default App;
