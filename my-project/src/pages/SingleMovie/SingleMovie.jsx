import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetOneMovieMutation } from "../../slices/movieApiSlice";
import Reviews from "../../components/Reviews/Reviews";
import Footer from "../../components/Footer/Footer";
import ReviewForm from "../../components/ReviewForm/ReviewForm";

const SingleMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null); // Start with null to handle loading state
  const { userInfo } = useSelector((state) => state.auth);
  const [isShown, setIsShown] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [getOneMovie] = useGetOneMovieMutation();

  // Fetch movie data
  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const res = await getOneMovie({ id: id });
        console.log(res.data); // Check if reviews are populated
        setMovie(res.data);
        setReviews(res.data.reviews || []); // This assumes reviews are populated already
        console.log(res.data.reviews);
      } catch (error) {
        console.error("Error getting movie data", error);
      }
    };
    fetchMovieData();
  }, [getOneMovie, id]);

  // Handle new review submission
  const handleNewReview = (newReview) => {
    setReviews((prevReviews) => [...prevReviews, newReview]); // Append new review
  };

  const handleClick = () => {
    setIsShown((current) => !current);
  };

  if (!movie) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-white">Loading movie details...</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center bg-gray-800 py-12 px-4">
        {/* Movie Details Section */}
        <div className="lg:w-1/2 w-full flex flex-col items-center lg:items-start text-center lg:text-left">
          <h1 className="text-4xl font-bold text-white mb-4">{movie.name}</h1>
          <div className="flex items-center mb-4">
            <span className="text-yellow-500 text-lg font-semibold">{movie.rating}</span>
            <i className="fa fa-star text-yellow-500 ml-2" aria-hidden="true"></i>
          </div>
          <p className="text-gray-400 text-sm mb-6">{movie.description}</p>

          {userInfo ? (
            <button
              onClick={handleClick}
              className="flex items-center bg-yellow-500 text-black px-6 py-3 rounded-md hover:bg-yellow-600 transition"
            >
              <i className="fa fa-star mr-2" aria-hidden="true"></i> REVIEW IT
            </button>
          ) : (
            <div className="flex items-center mt-4">
              <button className="flex items-center bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition">
                <Link to="/login" className="ml-2 text-yellow-500 font-semibold">
                  Login to review
                </Link>
              </button>
            </div>
          )}
        </div>

        {/* Movie Image Section */}
        <div className="lg:w-1/2 w-full mt-8 lg:mt-0">
          <img
            src={movie.image_url}
            alt={movie.name}
            className="w-full h-auto rounded-lg shadow-xl object-cover"
          />
        </div>
      </div>

      {/* Review Form */}
      {isShown && (
        <ReviewForm
          movieId={id}
          onReviewSubmit={(newReview) => handleNewReview(newReview)}
        />
      )}

      {/* Reviews Section */}
      <Reviews reviews={reviews} />

      {/* Footer */}
      <Footer />
    </>
  );
};

export default SingleMovie;
