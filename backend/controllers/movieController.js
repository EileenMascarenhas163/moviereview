import asyncHandler from "express-async-handler";
import Movie from "../models/movieModel.js";

// @desc    Get all movies
// route GET /api/movies
// access public
const getMovies = asyncHandler(async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(404);
    throw new Error("Server error: " + error.message);
  }
});

// @desc    Get one movie
// route GET /api/movies/:id
// access public
const getOneMovie = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) {
    res.status(404);
    throw new Error("Movie not found");
  }

  res.status(200).json(movie);
});

// @desc    Create a new movie (with base64 image)
// route POST /api/movies
// access public
const createMovie = asyncHandler(async (req, res) => {
  const { name, description, rating, image } = req.body;

  // Validate required fields
  if (!name || !description || !rating || !image) {
    console.error("Validation Error: Missing fields");
    return res.status(400).json({ message: "Please fill all fields and upload an image." });
  }

  // Validate rating range (1-10)
  if (rating < 1 || rating > 10) {
    console.error("Validation Error: Rating out of range");
    return res.status(400).json({ message: "Rating must be between 1 and 10." });
  }

  try {
    // Remove base64 prefix
   // const imageBase64 = image.startsWith("data:image") ? image.split(",")[1] : image;

    const newMovie = new Movie({
      name,
      description,
      rating,
      image_url: image, // Store the clean base64 string
    });

    const createdMovie = await newMovie.save();
    console.log("Movie created successfully:", createdMovie);
    res.status(201).json({ success: true, movie: createdMovie });
  } catch (error) {
    console.error("Error saving movie:", error.message, error.stack); // Log full error
    res.status(500).json({ success: false, message: error.message });
  }
});



export { getMovies, getOneMovie, createMovie };
