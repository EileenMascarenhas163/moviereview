import asyncHandler from "express-async-handler";
import Movie from "../models/movieModel.js";
import Review from "../models/reviewModel.js";
import mongoose from "mongoose";

// @desc    Create movie review
// route    POST /api/movies/review/:id
// access   private

const createReview = asyncHandler(async (req, res) => {
  const movieId = req.params.id;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(movieId)) {
    return res.status(400).json({ message: "Invalid movie ID" });
  }

  try {
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Create and save new review
    const { user, reviewText, rating } = req.body;
    if (!user || !reviewText || !rating) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newReview = await Review.create({ user, reviewText, rating });

    // Push review ID to movie's reviews array
    movie.reviews.push(newReview._id);
    await movie.save();

    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

// @desc    Get movie reviews (with population)
// route    GET /api/movies/review/:id
// access   private

const getReviewsForMovie = asyncHandler(async (req, res) => {
  const movieId = req.params.id;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(movieId)) {
    return res.status(400).json({ message: "Invalid movie ID" });
  }

  try {
    // Fetch movie by ID and populate its reviews
    const movie = await Movie.findById(movieId).populate("reviews");

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Return the populated reviews array
    res.status(200).json(movie.reviews);
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

// @desc    Get individual review by ID
// route    GET /api/reviews/:id
// access   private

const getReviewById = asyncHandler(async (req, res) => {
  const reviewId = req.params.id;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    return res.status(400).json({ message: "Invalid review ID" });
  }

  try {
    // Fetch review by ID
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Return the review details
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: `Error fetching review: ${error.message}` });
  }
});

export { createReview, getReviewsForMovie,getReviewById };
