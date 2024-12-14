import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  reviewText: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
});

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 10, // The movie's rating could be a computed average of reviews or set manually
  },
  image_url: {
    type: String,
    required: true,
  },
  reviews: [reviewSchema],  // Array of review subdocuments
});

// Optionally, you can add a method to calculate the average rating from reviews
movieSchema.methods.calculateAverageRating = function() {
  if (this.reviews.length === 0) {
    return 0;
  }
  const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
  return totalRating / this.reviews.length;
};

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
