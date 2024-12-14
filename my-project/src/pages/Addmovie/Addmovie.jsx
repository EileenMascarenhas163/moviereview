import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddMovie = () => {
  const [movieData, setMovieData] = useState({
    name: "",
    description: "",
    rating: 0,
    image: "", // Image URL will be provided as a string
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovieData({ ...movieData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const rating = parseInt(movieData.rating);

    // Validate all fields
    if (!movieData.name || !movieData.description || !rating || !movieData.image) {
      toast.error("Please fill in all fields.");
      return;
    }

    // Validate rating range (1-10)
    if (rating < 1 || rating > 10) {
      toast.error("Rating must be between 1 and 10.");
      return;
    }

    const data = {
      name: movieData.name,
      description: movieData.description,
      rating: rating,
      image: movieData.image, // Send the image URL directly
    };

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/movies", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data.success) {
        toast.success("Movie added successfully!");
        navigate("/");
      } else {
        toast.error("Error adding movie");
      }
    } catch (error) {
      console.error("Error adding movie:", error);
      toast.error("Error adding movie");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold text-yellow-500 mb-4">Add a New Movie</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4">
        <div>
          <label className="block text-sm font-medium">Movie Name</label>
          <input
            type="text"
            name="name"
            value={movieData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter movie name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={movieData.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter movie description"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Rating (1-10)</label>
          <input
            type="number"
            name="rating"
            value={movieData.rating}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter rating"
            min="1"
            max="10"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Image URL</label>
          <input
            type="text"
            name="image"
            value={movieData.image}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter image URL"
          />
        </div>
        <button
          type="submit"
          className={`w-full py-2 px-4 bg-yellow-500 text-black rounded-md ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={loading}
        >
          {loading ? "Adding Movie..." : "Add Movie"}
        </button>
      </form>
    </div>
  );
};

export default AddMovie;
