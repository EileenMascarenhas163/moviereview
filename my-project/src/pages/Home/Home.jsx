import React, { useState, useEffect } from "react";
import Hero from "../../components/Hero/Hero";
import Movies from "../../components/Movies/Movies";
import Footer from "../../components/Footer/Footer";
import { useGetAllMoviesMutation } from "../../slices/movieApiSlice";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [getAllMovies] = useGetAllMoviesMutation();

  useEffect(() => {
    // Function to fetch all movies from your backend API
    const fetchMovies = async () => {
      try {
        const response = await getAllMovies(); // Replace with your API endpoint URL
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    // Call the fetchMovies function to retrieve the movies
    fetchMovies();
  }, [getAllMovies]);

  return (
    <div className="bg-black text-white min-h-screen">
      <Hero />
      <div className="py-8 bg-yellow-500">
        <Movies movies={movies} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
