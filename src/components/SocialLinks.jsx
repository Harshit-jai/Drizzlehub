import React from "react";
import { FaSquareGithub } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaSquareXTwitter } from "react-icons/fa6";

const SocialLinks = () => {
  const linkedinUrl = "https://www.linkedin.com/in/avinashs46/";
  const githubUrl = "https://github.com/avinashsingh108";
  const twitterUrl = "https://x.com/_Avi108_";

  const handleClick = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  return (
    <div className="border-t pt-1 border-black">
      <p className="text-xl ">Connect with me on:</p>
      <div className="flex gap-x-6 text-4xl">
        <IoLogoLinkedin
          onClick={() => handleClick(linkedinUrl)}
          className="hover:cursor-pointer transition transform ease-in-out duration-300 hover:scale-105"
        />
        <FaSquareGithub
          onClick={() => handleClick(githubUrl)}
          className="hover:cursor-pointer transition transform ease-in-out duration-300 hover:scale-105"
        />
        <FaSquareXTwitter
          onClick={() => handleClick(twitterUrl)}
          className="hover:cursor-pointer transition transform ease-in-out duration-300 hover:scale-105"
        />
      </div>
    </div>
  );
};

export default SocialLinks;
