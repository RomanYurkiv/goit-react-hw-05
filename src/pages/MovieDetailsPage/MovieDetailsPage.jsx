import css from "./MovieDetailsPage.module.css";
import clsx from "clsx";
import { useEffect, useState, Suspense } from "react";
import { useParams, Outlet, NavLink, useLocation } from "react-router-dom";

import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { getMovieDetails } from "../../components/config";

const MovieDetailsPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);
  const { movieId } = useParams();
  const location = useLocation();

  function buildLinkClass({ isActive }) {
    return clsx(css.infoLink, {
      [css.active]: isActive,
    });
  }

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        setLoading(true);
        setError(false);
        const details = await getMovieDetails(movieId);
        setMovieDetails(details);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchMovieDetails();
  }, [movieId, setLoading, setError, location]);

  return (
    <>
      {movieDetails !== null && (
        <div className={css.wrapper}>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              alt={movieDetails.title}
            />
          </div>

          <div>
            <h1>{movieDetails.title}</h1>
            <p>Rating: {movieDetails.vote_average.toFixed(2)}/10</p>
            <h2>Overview</h2>
            <p>{movieDetails.overview}</p>
            <h3>Genres</h3>
            <p>{movieDetails.genres.map((genre) => genre.name).join(", ")}</p>

            <div>
              <h3>Movie description</h3>
              <ul>
                <li>
                  <NavLink className={buildLinkClass} to="cast">
                    Cast
                  </NavLink>
                </li>
                <li>
                  <NavLink className={buildLinkClass} to="reviews">
                    Reviews
                  </NavLink>
                </li>
              </ul>

              <div>
                <Suspense fallback={<b>Loading...</b>}>
                  <Outlet />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      )}
      {loading && movieDetails === null && <Loader />}
      {error && <ErrorMessage />}
    </>
  );
};
export default MovieDetailsPage;
