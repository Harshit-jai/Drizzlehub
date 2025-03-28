import React, { useState } from "react";
import { FaSquareGithub } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";
// import { FaSquareXTwitter } from "react-icons/fa6";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useDarkMode } from "../context/DarkModeContext";

const SocialLinks = () => {
  const linkedinUrl = "https://www.linkedin.com/in/harshit-jai7/";
  const githubUrl = "https://github.com/Harshit-jai";
  // const twitterUrl = "https://x.com/_Avi108_";
  const { darkMode, toggleMode } = useDarkMode();

  const handleClick = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={`$ {darkMode && "dark"} border-t pt-3 border-gray-300 dark:border-gray-700 text-center`}> 
      <p className="text-lg font-medium dark:text-gray-300">Connect with me:</p>
      <div className="flex justify-center gap-6 text-3xl mt-2">
        {[{ Icon: IoLogoLinkedin, url: linkedinUrl },
          { Icon: FaSquareGithub, url: githubUrl },
          // { Icon: FaSquareXTwitter, url: twitterUrl }
        ].map(({ Icon, url }, index) => (
          <Icon
            key={index}
            onClick={() => handleClick(url)}
            className="cursor-pointer text-gray-700 dark:text-gray-300 transition-transform transform hover:scale-110 hover:text-blue-500 dark:hover:text-blue-400"
          />
        ))}
      </div>
      <div className="flex justify-center mt-3">
        <button
          className="text-2xl bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-full p-2 transition-all duration-300 hover:bg-gray-300 dark:hover:bg-gray-600"
          onClick={toggleMode}
        >
          {darkMode ? <MdOutlineLightMode /> : <MdDarkMode />}
        </button>
      </div>
    </div>
  );
};

export default SocialLinks;