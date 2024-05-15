import css from "./MovieCast.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast } from "/src/components/config";
import MovieCastItem from "../../components/MovieCastItem/MovieCastItem";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const MovieCast = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();
  const [actors, setActors] = useState([]);

  useEffect(() => {
    const fetchMovieCast = async () => {
      try {
        setLoading(true);
        setError(false);
        const cast = await getMovieCast(movieId);
        setActors(cast.slice(0, 3));
        console.log(cast);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieCast();
  }, [movieId]);

  return (
    <>
      {actors.length > 0 ? (
        <ul className={css.actorList}>
          {actors.map((actor) => (
            <li key={actor.id} className={css.actorListItem}>
              <MovieCastItem actor={actor} />
            </li>
          ))}
        </ul>
      ) : (
        <p>Information about actors is not available.</p>
      )}
      {loading && <Loader />}
      {error && <ErrorMessage />}
    </>
  );
};

export default MovieCast;
