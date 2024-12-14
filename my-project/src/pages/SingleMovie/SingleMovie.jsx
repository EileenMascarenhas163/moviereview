import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./SingleMovie.css";
import Reviews from "../../components/Reviews/Reviews";
import Footer from "../../components/Footer/Footer";
import ReviewForm from "../../components/ReviewForm/ReviewForm";
import { useGetOneMovieMutation } from "../../slices/movieApiSlice";

const SingleMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const [isShown, setIsShown] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [getOneMovie] = useGetOneMovieMutation();

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const res = await getOneMovie({ id: id });
        setMovie(res.data);
        setReviews(res.data.reviews || []);
      } catch (error) {
        console.error("Error getting movie data", error);
      }
    };
    fetchMovieData();
  }, [getOneMovie, id, submittingReview]);

  const handleNewReview = (newReview) => {
    setReviews([...reviews, newReview]);
    setSubmittingReview(true);
  };

  const handleClick = (event) => {
    setIsShown((current) => !current);
  };
  return (
    <>
      <div className="single-movie-card">
        <div className="single-movie-container">
          <div className="product-details">
            <h1>{movie.name}</h1>
            <span className="hint-star star">
              {movie.rating}
              <i className="fa fa-star" aria-hidden="true"></i>
            </span>

            <p className="movie-desc">{movie.description}</p>

            {userInfo ? (
              <div className="control">
                <button className="btn" onClick={handleClick}>
                  <span className="price">
                    <i className="fa fa-film"></i>
                  </span>
                  <span className="shopping-cart">
                    <i className="fa fa-star" aria-hidden="true"></i>
                  </span>
                  <span className="buy">REVIEW IT</span>
                </button>
              </div>
            ) : (
              <div className="control">
                <button className="btn">
                  <span className="price">
                    <i className="fa fa-lock"></i>
                  </span>
                  <span className="shopping-cart">
                    <i className="fa fa-user" aria-hidden="true"></i>
                  </span>
                  <span className="buy">
                    <Link className="link" to="/login">
                      LOGIN
                    </Link>
                  </span>
                </button>
              </div>
            )}
          </div>

          <div className="movie-image">
            <img src={movie.image_url} alt="" />
          </div>
        </div>
      </div>
      {isShown && (
        <ReviewForm
          movieId={id}
          onReviewSubmit={(newReview) => handleNewReview(newReview)}
        />
      )}
      <Reviews reviews={movie.reviews} />
      <Footer />
    </>
  );
};

export default SingleMovie;
