import css from "./MovieReviews.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "/src/components/config";
import MovieReviewsItem from "../../components/MovieReviewsItem/MovieReviewsItem";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const MovieReviews = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        setLoading(true);
        setError(false);
        const reviews = await getMovieReviews(movieId);
        setReviews(reviews.slice(0, 3));
        console.log(reviews);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieReviews();
  }, [movieId, setLoading, setError, setReviews]);

  return (
    <>
      {reviews.length > 0 ? (
        <ul className={css.reviewList}>
          {reviews.map((review) => (
            <li key={review.id} className={css.reviewListItem}>
              <MovieReviewsItem review={review} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews available.</p>
      )}
      {loading && <Loader />}
      {error && <ErrorMessage />}
    </>
  );
};

export default MovieReviews;
