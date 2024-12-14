import asyncHandler from 'express-async-handler';
import Review from '../models/reviewModel.js';
import Movie from '../models/movieModel.js';

const createReview = asyncHandler(async (req, res) => {
  const { movieId } = req.params; // Get movieId from URL parameters
  const { rating, comment } = req.body; // Get review data from request body

  // Find the movie by ID
  const movie = await Movie.findById(movieId);

  if (!movie) {
    return res.status(404).json({ message: 'Movie not found' });
  }

  // Create a new review
  const review = new Review({
    movie: movieId,
    user: req.user._id, // Assuming you have user authentication
    rating,
    comment,
  });

  // Save the review
  const createdReview = await review.save();

  // Add the review to the movie's reviews array
  movie.reviews.push(createdReview._id);
  await movie.save();

  res.status(201).json({ message: 'Review created successfully', review: createdReview });
});

export { createReview };
