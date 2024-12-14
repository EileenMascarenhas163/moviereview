import React from "react";

const Footer = () => {
  return (
    <div className="bg-black text-yellow-500 py-10 px-5">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-4">REVIEWiT</h3>
        <p className="text-yellow-300 mb-6">
          Lights, Camera, Review - Your ultimate cinematic destination, where
          honest critiques and passionate discussions unite, empowering you to
          explore, rate, and discover the latest releases, transforming
          movie-watching into an immersive and enlightening experience, while
          connecting you with a vibrant community of fellow film enthusiasts.
        </p>
        <ul className="flex justify-center space-x-6 mb-6">
          <li>
            <a href="#" aria-label="Facebook" className="text-yellow-500 hover:text-yellow-300">
              <i className="fa fa-facebook text-2xl"></i>
            </a>
          </li>
          <li>
            <a href="#" aria-label="Twitter" className="text-yellow-500 hover:text-yellow-300">
              <i className="fa fa-twitter text-2xl"></i>
            </a>
          </li>
          <li>
            <a href="#" aria-label="Google Plus" className="text-yellow-500 hover:text-yellow-300">
              <i className="fa fa-google-plus text-2xl"></i>
            </a>
          </li>
          <li>
            <a href="#" aria-label="YouTube" className="text-yellow-500 hover:text-yellow-300">
              <i className="fa fa-youtube text-2xl"></i>
            </a>
          </li>
          <li>
            <a href="#" aria-label="LinkedIn" className="text-yellow-500 hover:text-yellow-300">
              <i className="fa fa-linkedin-square text-2xl"></i>
            </a>
          </li>
        </ul>
        <div className="border-t border-yellow-700 pt-4">
          <p className="text-yellow-400">
            copyright &copy;2023 <a href="https://github.com/soham-basak" className="text-yellow-500 hover:text-yellow-300">Dexter</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
