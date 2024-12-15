import mongoose from "mongoose";
import Review from "./reviewModel.js"; // Ensure Review is imported if you reference it

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
    default: 0,  // Start with 0 or a default value
    min: 1,
    max: 10,
  },
  image_url: {
    type: String,
    required: true,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

// Method to calculate average rating
movieSchema.methods.calculateAverageRating = async function () {
  if (this.reviews.length === 0) {
    this.rating = 0;
    await this.save(); // Save movie with updated rating if no reviews
    return;
  }

  const totalRating = await Review.aggregate([
    { $match: { _id: { $in: this.reviews } } },
    { $group: { _id: null, avgRating: { $avg: "$rating" } } },
  ]);

  // If there's no totalRating, just set it to 0
  const avgRating = totalRating[0] ? totalRating[0].avgRating : 0;
  this.rating = avgRating;
  await this.save(); // Save movie with updated average rating
};

// Middleware to automatically update the average rating after adding a review
movieSchema.post('save', function (doc) {
  // Recalculate average rating after saving the review
  doc.calculateAverageRating();
});

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;
