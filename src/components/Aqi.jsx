import React from "react";
import { motion } from "framer-motion";

const Aqi = ({ aqi }) => {
  const percentage = ((aqi) / 5) * 100;

  const getColorAndLabel = (value) => {
    if (value <= 1) return { color: "#4CAF50", label: "Good", emoji: "😄" };
    if (value <= 2) return { color: "#FFC107", label: "Fair", emoji: "😊" };
    if (value <= 3) return { color: "#FF9800", label: "Moderate", emoji: "😑" };
    if (value <= 4) return { color: "#F44336", label: "Poor", emoji: "😷" };
    return { color: "#9C27B0", label: "Very Poor", emoji: "😨" };
  };

  const { color, label, emoji } = getColorAndLabel(aqi);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center p-3 w-full max-w-sm mx-auto shadow-none"
    >
      <h2 className="text-md font-semibold text-gray-800 dark:text-gray-200">Air Quality Index</h2>
      <motion.h1 
        className="text-2xl font-bold text-gray-900 dark:text-gray-100"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        AQI: {aqi} <span className="text-xs text-gray-600 dark:text-gray-400">(Range 1-5)</span>
      </motion.h1>
      <div className="relative w-full h-3 rounded-full bg-gray-300 dark:bg-gray-700 overflow-hidden mt-2">
        <motion.div 
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{ backgroundColor: color }}
        ></motion.div>
      </div>
      <motion.div 
        className="flex items-center gap-2 mt-3"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">{label}</h1>
        <motion.p 
          className="text-2xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          {emoji}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default Aqi;
