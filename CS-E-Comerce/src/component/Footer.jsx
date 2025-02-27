import React from "react";
import { SlSocialLinkedin } from "react-icons/sl";
import { FaGithub } from "react-icons/fa";
import { SlSocialInstagram } from "react-icons/sl";

function Footer() {
  return (
    <div>
      <footer className="bg-white dark:bg-gray-900">
        <div className="mx-auto w-full max-w-screen-xl">
          <div className="px-4 py-6 bg-gray-100 dark:bg-gray-700 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">
              © 2025 akashnikam. All Rights Reserved.
            </span>
            <div className="flex space-x-6 justify-center mt-4 md:mt-0">
              <a
                href="https://www.linkedin.com/in/akash-nikam-9b428424b"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-900 dark:hover:text-white"
              >
                <SlSocialLinkedin size={24} />
              </a>
              <a
                href="https://https://github.com/akashsnikam"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-900 dark:hover:text-white"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-900 dark:hover:text-white"
              >
                <SlSocialInstagram size={24} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
