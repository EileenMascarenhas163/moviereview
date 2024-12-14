import React from "react";
import heroImg from "../../img/hero.jfif";

const Hero = () => {
  return (
    <div className="bg-black text-yellow-500">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center py-10 px-5">
        <div className="text-center md:text-left md:w-1/2 mb-6 md:mb-0">
          <h2 className="text-4xl font-bold">Lights,</h2>
          <h2 className="text-4xl font-bold">Camera, Review:</h2>
          <h3 className="text-xl mt-4 text-yellow-300">
            Your Ultimate Destination for Movie Enthusiasts!
          </h3>
        </div>
        <div className="md:w-1/2">
          <img
            src={heroImg}
            alt="Hero"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Divider Section */}
      <div className="text-center py-6">
        <h1 className="text-5xl font-extrabold text-yellow-500 fancy">
          MOVIES
        </h1>
      </div>
    </div>
  );
};

export default Hero;
