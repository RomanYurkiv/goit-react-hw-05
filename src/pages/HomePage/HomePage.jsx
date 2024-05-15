import { useEffect, useState } from "react";
import { getTrendingMovies } from "/src/components/config";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import css from "./HomePage.module.css";

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        setLoading(true);
        setError(false);
        const trendingMovies = await getTrendingMovies();
        setMovies(trendingMovies);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div className={css.homeContainer}>
      <h1>Trending today</h1>
      {movies.length > 0 && <MovieList movies={movies} />}
      {loading && <Loader />}
      {error && <ErrorMessage />}
    </div>
  );
};

export default HomePage;
