import React from "react";
import { Link } from "react-router-dom";
import "./Movie.css";

const Movie = ({ movie }) => {

  return (
    <>
      {/*<div className="movie">
        <article className="card">
         
          <div className="card__content | flow">
            <div className="card__content--container | flow">
              <h3 className="card__title">{movie.name}</h3>
              <p className="card__description">{movie.description}</p>
            </div>
            <button className="card__button">
             
            </button>
          </div>
        </article>
      </div>*/}
      <Link className="link" to={`/movie/${movie._id}`}>{movie.name}
              {/* <img
            className="card__background"
            src={movie.image_url}
            alt={movie.image_url}
            width="1920"
            height="2193"
          /> */}
              </Link>
    </>
  );
};

export default Movie;
